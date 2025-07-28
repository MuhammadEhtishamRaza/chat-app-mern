import { useActionState, useEffect, useState } from 'react';
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
    const { theme, toggleTheme } = useTheme();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const LogoutNavigate = useNavigate();

    // Function to fetch current user data
    const fetchCurrentUser = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/user/me", {
                method: "GET",
                credentials: "include"
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
            const response = await fetch("http://localhost:3000/api/user/users-by-ids", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userIds }),
                credentials: "include"
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

    // Function to fetch messages for a conversation
    const fetchMessages = async (receiverId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/message/${receiverId}`, {
                method: "GET",
                credentials: "include"
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
            const response = await fetch(`http://localhost:3000/api/message/send/${receiverId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
                credentials: "include"
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
            const userData = await fetchCurrentUser();
            if (userData) {
                // Emit new user add event with the actual user ID
                socket.emit("new-user-add", userData._id);
            }
        };

        initializeUser();

        // Listen for online users updates
        socket.on("online-users", async (onlineUsersList) => {
            console.log("Online users:", onlineUsersList);
            setOnlineUsers(onlineUsersList);

            // Fetch user data for online users
            if (onlineUsersList.length > 0) {
                const usersData = await fetchUsersByIds(onlineUsersList);
                setOnlineUsersData(usersData);
            } else {
                setOnlineUsersData([]);
            }
        });

        // Cleanup on unmount
        return () => {
            socket.off("online-users");
        };
    }, [])

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

    const handleLogout = async () => {
        const res = await fetch("http://localhost:3000/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result = await res.json()
        if (result.message == "User Logged Out Successfully.") {
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
                <ul>
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
                        <div className="chat-messages">
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