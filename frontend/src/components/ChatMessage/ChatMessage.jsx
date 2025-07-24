import { useEffect, useState, useRef } from 'react';
import ShowMoreText from 'react-show-more-text';
import { getSocket } from "../../socket/socket";

const ChatMessage = ({ user }) => {
    const id = user._id;
    const [conversations, setConversations] = useState([]);
    const bottomRef = useRef(null); // anchor to scroll into view

    const fetchConversation = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/message/${id}`, {
                credentials: "include"
            });
            const result = await res.json();
            return result;
        } catch (error) {
            console.error("Error while fetching Conversation: ", error);
            return [];
        }
    };

    useEffect(() => {
        const getConversations = async () => {
            const data = await fetchConversation(id);
            setConversations(data);
        };
        getConversations();
    }, [id]);

    useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        const handleReceiveMessage = (message) => {
            setConversations((prev) => [...prev, message]);
        };

        socket.on("sendMessage", handleReceiveMessage);

        return () => {
            socket.off("sendMessage", handleReceiveMessage);
        };
    }, []);


    // Scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversations]);

    const loggedUser = user._id;

    return (
        <>
            {conversations.map((conversation) => (
                <div key={conversation._id} className={`w-full flex ${(loggedUser === conversation.senderId) ? 'justify-start' : 'justify-end'}`}>
                    <div className={`flex w-4/5 ${(loggedUser === conversation.senderId) ? 'justify-start' : 'justify-end'} mb-2`}>
                        <div className={`p-4 bg-gradient-to-r ${(loggedUser === conversation.senderId) ? "from-yellow-100 to-yellow-50" : "from-green-100 to-green-50"} border-2 ${(loggedUser === conversation.senderId) ? 'border-yellow-400' : 'border-green-700'} rounded-2xl shadow`}>
                            <ShowMoreText
                                lines={3}
                                more="Show More"
                                less="Show Less"
                                anchorClass="text-green-600 cursor-pointer"
                                className={`${(loggedUser === conversation.senderId) ? "text-yellow-500" : "text-green-500"}`}
                                expanded={false}
                            >
                                {conversation.content}
                            </ShowMoreText>
                        </div>
                    </div>
                </div>
            ))}
            <div ref={bottomRef} /> {/* scroll anchor */}
        </>
    );
};

export default ChatMessage;
