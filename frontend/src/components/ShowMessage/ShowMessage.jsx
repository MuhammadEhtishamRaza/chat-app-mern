import { useEffect, useState } from "react";
import { getSocket } from "../../socket/socket";
import ChatMessage from "../ChatMessage/ChatMessage"
import image from "../../assets/chat-bg-1.png"

const ShowMessage = ({ user }) => {
    const [conversations, setConversations] = useState([]);

    // Fetch messages function (as you already have)
    const fetchConversation = async (id) => {
        // ... your fetch logic ...
    };

    useEffect(() => {
        // Initial fetch
        fetchConversation(user._id).then(setConversations);

        // Set up socket listener
        const socket = getSocket();
        if (socket) {
            socket.on("receiveMessage", (message) => {
                // Option 1: Re-fetch all messages
                fetchConversation(user._id).then(setConversations);

                // Option 2: Optimistically add the new message
                // setConversations(prev => [...prev, message]);
            });
        }

        // Clean up the listener on unmount
        return () => {
            if (socket) {
                socket.off("receiveMessage");
            }
        };
    }, [user._id]);

    return (
        <div className="overflow-y-auto h-full px-2 py-4 bg-gradient-to-b from-white to-blue-50 rounded-b-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-blue-50 [&::-webkit-scrollbar-thumb]:bg-blue-200 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
            <div className="p-3">
                <ChatMessage user={user} />
            </div>
        </div>
    )
}

export default ShowMessage