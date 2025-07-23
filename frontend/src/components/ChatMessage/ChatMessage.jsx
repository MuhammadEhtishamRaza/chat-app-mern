import { useEffect, useState } from 'react';
import ShowMoreText from 'react-show-more-text';

const ChatMessage = ({ user }) => {
    const id = user._id;
    const [conversations, setConversations] = useState([]);

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
        setConversations([])
        const getConversations = async () => {
            const data = await fetchConversation(id);
            setConversations(data);
        };
        getConversations();
    }, [id]);

    const loggedUser = user._id;

    return (
        <>
            {conversations.map((conversation) => (
                <div key={conversation._id} className={`w-full flex ${(loggedUser === conversation.senderId) ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex w-4/5 ${(loggedUser === conversation.senderId) ? 'justify-end' : 'justify-start'} mb-2`}>
                        <div className={`p-4 bg-gradient-to-r ${(loggedUser === conversation.senderId) ? "from-yellow-100 to-yellow-50" : "from-green-100 to-green-50"} border-2 ${(loggedUser === conversation.senderId) ? 'border-yellow-400' : 'border-green-700'} rounded-2xl shadow`}>
                            <ShowMoreText lines={3} more="Show More" less="Show Less" anchorClass="text-green-600 cursor-pointer" className={`${(loggedUser === conversation.senderId) ? "text-yellow-500" : "text-green-500"}`} expanded={false}>
                                {conversation.content}
                            </ShowMoreText>
                        </div>
                    </div>
                </div >
            ))}
        </>
    )
}

export default ChatMessage