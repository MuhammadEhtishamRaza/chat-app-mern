import { useActionState, useEffect, useState, useRef } from 'react';
import { useTheme } from '../main';
import socket from '../socket/socket.js';
import { useNavigate } from 'react-router-dom';

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export default function ChatPage() {
    const [input, setInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [onlineUsersData, setOnlineUsersData] = useState([]);
    const [allUsersData, setAllUsersData] = useState([]);
    const [pendingOnlineUsers, setPendingOnlineUsers] = useState([]);
    const { theme, toggleTheme } = useTheme();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const LogoutNavigate = useNavigate();
    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            // Add smooth scrolling behavior temporarily
            messagesContainerRef.current.style.scrollBehavior = 'smooth';
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            // Reset scroll behavior after animation
            setTimeout(() => {
                if (messagesContainerRef.current) {
                    messagesContainerRef.current.style.scrollBehavior = 'auto';
                }
            }, 500);
        }
    };

    // Function to fetch current user data
    const fetchCurrentUser = async () => {
        try {
            const token = sessionStorage.getItem('token');
            console.log("Sending token:", token);

            const response = await fetch("http://localhost:5000/api/user/me", {
                method: "GET",
                // credentials: "include"
                // method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
                },
                // body: JSON.stringify({ message }),
            });

            if (response.ok) {
                const userData = await response.json();
                setLoggedInUser(userData);
                return userData;
            } else {
                console.error("Failed to fetch current user data");
                return null;
            }
        } catch (error) {
            console.error("Error fetching current user data:", error);
            return null;
        }
    };

    // Function to fetch user data by IDs
    const fetchUsersByIds = async (userIds) => {
        try {
            const response = await fetch("http://localhost:5000/api/user/users-by-ids", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify({ userIds }),
                // credentials: "include"
            });

            if (response.ok) {
                const usersData = await response.json();
                return usersData;
            } else {
                console.error("Failed to fetch users data");
                return [];
            }
        } catch (error) {
            console.error("Error fetching users data:", error);
            return [];
        }
    };

    // Function to fetch all users
    const fetchAllUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/user/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const usersData = await response.json();
                return usersData;
            } else {
                console.error("Failed to fetch all users");
                return [];
            }
        } catch (error) {
            console.error("Error fetching all users:", error);
            return [];
        }
    };

    // Function to fetch messages for a conversation
    const fetchMessages = async (receiverId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/message/${receiverId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
                },
                // credentials: "include"
            });

            if (response.ok) {
                const messagesData = await response.json();
                return messagesData;
            } else {
                console.error("Failed to fetch messages");
                return [];
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
            return [];
        }
    };

    // Function to send a message
    const sendMessage = async (message, receiverId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/message/send/${receiverId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify({ message }),
                // credentials: "include"
            });

            if (response.ok) {
                const newMessage = await response.json();
                return newMessage;
            } else {
                console.error("Failed to send message");
                return null;
            }
        } catch (error) {
            console.error("Error sending message:", error);
            return null;
        }
    };

    useEffect(() => {
        // Fetch current user data and then emit socket event
        const initializeUser = async () => {
            console.log('Initializing user...');
            const userData = await fetchCurrentUser();
            if (userData) {
                console.log('User data fetched:', userData);
                // Emit new user add event with the actual user ID
                socket.emit("new-user-add", userData._id);
                console.log('New user add event emitted for:', userData._id);
            }
        };

        initializeUser();

        // Fetch all users initially
        const loadAllUsers = async () => {
            console.log('Loading all users...');
            const allUsers = await fetchAllUsers();
            console.log('All users loaded:', allUsers);
            setAllUsersData(allUsers);
        };
        loadAllUsers();

        // Listen for online users updates
        const handleOnlineUsers = (onlineUsersList) => {
            console.log("Socket received online users:", onlineUsersList);
            setOnlineUsers(onlineUsersList);

            // If allUsersData is not loaded yet, store these as pending
            if (allUsersData.length === 0) {
                console.log('Storing online users as pending:', onlineUsersList);
                setPendingOnlineUsers(onlineUsersList);
            }
        };

        socket.on("online-users", handleOnlineUsers);

        // Request online users after a short delay to ensure socket is ready
        setTimeout(() => {
            console.log('Requesting online users...');
            socket.emit("get-online-users");
        }, 1000);

        // Cleanup on unmount
        return () => {
            socket.off("online-users", handleOnlineUsers);
        };
    }, [])

    // Update online users data when allUsersData or onlineUsers change
    useEffect(() => {
        console.log('useEffect triggered - allUsersData length:', allUsersData.length, 'onlineUsers length:', onlineUsers.length);
        console.log('allUsersData:', allUsersData);
        console.log('onlineUsers:', onlineUsers);
        console.log('pendingOnlineUsers:', pendingOnlineUsers);

        if (allUsersData.length > 0) {
            // Use pending online users if available, otherwise use current onlineUsers
            const usersToProcess = pendingOnlineUsers.length > 0 ? pendingOnlineUsers : onlineUsers;

            if (usersToProcess.length > 0) {
                const onlineUsersData = allUsersData.filter(user =>
                    usersToProcess.includes(user._id.toString())
                );
                console.log('Filtered online users data:', onlineUsersData);
                setOnlineUsersData(onlineUsersData);

                // Clear pending users after processing
                if (pendingOnlineUsers.length > 0) {
                    setPendingOnlineUsers([]);
                }
            } else {
                // If no online users, clear the online users data
                console.log('No online users, clearing onlineUsersData');
                setOnlineUsersData([]);
            }
        }
    }, [allUsersData, onlineUsers, pendingOnlineUsers]);

    // Fetch messages when selectedUser changes
    useEffect(() => {
        if (selectedUser && loggedInUser) {
            const loadMessages = async () => {
                const messages = await fetchMessages(selectedUser.id);
                setChatMessages(messages);
            };
            console.log(selectedUser)
            loadMessages();
        } else {
            setChatMessages([]);
        }
    }, [selectedUser, loggedInUser]);

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const handleLogout = async () => {
        const res = await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result = await res.json()
        if (result.message == "User Logged Out Successfully.") {
            sessionStorage.removeItem("token")
            socket.disconnect()
            console.log("Disconnected from server")
            LogoutNavigate("/login")
        }
    }

    const [error, SendAction, isLoading] = useActionState(
        async () => {
            if (
                !input.trim() ||
                !selectedUser ||
                selectedUser.id === loggedInUser?._id // Prevent sending to self
            ) return;

            const messageText = input.trim();
            setInput('');

            // Optimistically add the message to the UI
            const tempMessage = {
                senderId: loggedInUser?._id,
                message: messageText,
                receiverId: selectedUser.id,
            };
            console.log(selectedUser.id)
            console.log(tempMessage.receiverId)

            socket.emit("send-message", tempMessage)

            setChatMessages(prev => [...prev, tempMessage]);

            // Send the message to the server
            const sentMessage = await sendMessage(messageText, selectedUser.id);

            if (sentMessage) {
                // Replace the temp message with the real one from server
                setChatMessages(prev =>
                    prev.map(msg =>
                        msg._id === tempMessage._id ? sentMessage : msg
                    )
                );
                return null; // No error
            } else {
                // Remove the temp message if sending failed
                setChatMessages(prev =>
                    prev.filter(msg => msg._id !== tempMessage._id)
                );
                return 'Failed to send message.';
            }
        },
        null
    );

    useEffect(() => {
        const handleReceiveMessage = (msg) => {
            console.log("The message received is: ", msg)
            // Only add the message if it's for the currently selected user
            if (
                selectedUser &&
                ((msg.senderId === selectedUser.id && msg.receiverId === loggedInUser._id) ||
                    (msg.senderId === loggedInUser._id && msg.receiverId === selectedUser.id))
            ) {
                setChatMessages(prev => [...prev, {
                    _id: Date.now().toString(),
                    senderId: msg.from,
                    message: msg.message,
                    createdAt: msg.time
                }]);
            }
        };

        socket.on("receive-message", handleReceiveMessage);

        return () => {
            socket.off("receive-message", handleReceiveMessage);
        };
    }, [selectedUser, loggedInUser]);

    return (
        <div className="chat-layout">
            <button
                className="theme-toggle"
                data-icon={theme === 'light' ? '🌙' : '☀️'}
                onClick={toggleTheme}
            >
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
            <aside className="chat-sidebar">
                <div className="card-logo" style={{ margin: '0 auto 1.5rem auto' }} aria-label="Chat App Logo" title="Chat App">💬</div>
                {/* User info below logo */}
                {loggedInUser && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, width: '100%', justifyContent: 'space-between' }} className='sender-info'>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <a href="/profile"><span className="avatar" style={{ width: 40, height: 40, fontSize: '1.2rem' }}>{getInitials(loggedInUser.name)}</span></a>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 600 }}>{loggedInUser.name}</span>
                                <span style={{ fontSize: '0.92rem', color: '#888' }}>{loggedInUser.email}</span>
                            </div>
                        </div>
                        <button title="Logout" aria-label="Logout" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', color: '#4f8cff', marginLeft: 4 }} onClick={handleLogout}>
                            🚪
                        </button>
                    </div>
                )}
                <h3>Online Users</h3>
                <ul className="online-users-list">
                    {onlineUsersData.length > 0 ? (
                        onlineUsersData
                            .filter(user => user._id !== loggedInUser?._id)
                            .map(user => (
                                <li
                                    key={user._id}
                                    className={selectedUser && user._id === selectedUser.id ? 'active' : ''}
                                    onClick={() => setSelectedUser({ id: user._id, name: user.name, email: user.email })}
                                >
                                    <span className="avatar">{getInitials(user.name)}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        {user.name}
                                        <span style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: '#4CAF50',
                                            display: 'inline-block'
                                        }} title="Online"></span>
                                    </div>
                                </li>
                            ))
                    ) : (
                        <li style={{ color: '#888', fontStyle: 'italic' }}>No users online</li>
                    )}
                </ul>

                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Offline Users</h3>
                <ul className="offline-users-list">
                    {allUsersData.length > 0 ? (
                        allUsersData
                            .filter(user => user._id !== loggedInUser?._id && !onlineUsers.includes(user._id.toString()))
                            .map(user => (
                                <li
                                    key={user._id}
                                    className={selectedUser && user._id === selectedUser.id ? 'active' : ''}
                                    // onClick={() => setSelectedUser({ id: user._id, name: user.name, email: user.email })}
                                    style={{
                                        opacity: 0.6,
                                        cursor: 'pointer',
                                        filter: 'grayscale(0.3)'
                                    }}
                                    disabled
                                >
                                    <span className="avatar" style={{ opacity: 0.7 }}>{getInitials(user.name)}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        {user.name}
                                        <span style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: '#888',
                                            display: 'inline-block'
                                        }} title="Offline"></span>
                                    </div>
                                </li>
                            ))
                    ) : (
                        <li style={{ color: '#888', fontStyle: 'italic' }}>No offline users</li>
                    )}
                </ul>
            </aside>
            <section className="chat-window">
                {selectedUser ? (
                    <>
                        {/* Receiver info at top */}
                        <div className="top-bar" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 18,
                            padding: '1.3rem 2rem 1rem 2rem',
                            borderBottom: '2.5px solid var(--primary)',
                            marginBottom: 12,
                            background: 'var(--glass-bg)',
                            borderRadius: '0 0 18px 18px',
                            boxShadow: '0 2px 12px rgba(79,140,255,0.10)',
                            position: 'sticky',
                            top: 0,
                            zIndex: 2
                        }}>
                            <span className="avatar" style={{ width: 54, height: 54, fontSize: '1.5rem', boxShadow: '0 2px 8px rgba(79,140,255,0.10)' }}>{getInitials(selectedUser.name)}</span>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 700, fontSize: '1.18rem', color: 'var(--primary)' }}>{selectedUser.name}</span>
                                <span style={{
                                    fontSize: '1rem',
                                    color: onlineUsers.includes(selectedUser.id.toString()) ? '#4CAF50' : '#888',
                                    fontWeight: 500
                                }} className='status'>
                                    {onlineUsers.includes(selectedUser.id.toString()) ? 'Online' : 'Offline'}
                                </span>
                            </div>
                        </div>
                        <div className="chat-messages" ref={messagesContainerRef}>
                            {chatMessages.map(msg => {
                                const isOwnMessage = msg.senderId === loggedInUser?._id;
                                return (
                                    <div
                                        key={msg._id}
                                        className={isOwnMessage ? 'message own' : 'message'}
                                        style={isOwnMessage ? {
                                            background: 'linear-gradient(90deg, #4f8cff 0%, #a770ef 100%)',
                                            color: '#fff',
                                            boxShadow: '0 2px 12px rgba(79,140,255,0.12)'
                                        } : {}}
                                    >
                                        <span className="sender">{isOwnMessage ? 'You' : selectedUser.name}:</span> {msg.message}
                                    </div>
                                );
                            })}
                        </div>
                        <form className="chat-input" action={SendAction}>
                            <input
                                type="text"
                                value={input}
                                placeholder={`Message ${selectedUser.name}`}
                                onChange={e => setInput(e.target.value)}
                                disabled={isLoading}
                            />
                            <button type="submit" aria-label="Send message" disabled={isLoading || !input.trim()}>
                                {isLoading ? 'Sending...' : '✈️'}
                            </button>
                        </form>
                        {error && <div className="form-error" style={{ color: 'red', marginTop: 8 }}>{error}</div>}
                    </>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: '#888',
                        fontSize: '1.1rem'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }} className='hidden-avatar'>💬</div>
                        <p>Select a user to start chatting</p>
                    </div>
                )}
            </section>
        </div>
    );
} 