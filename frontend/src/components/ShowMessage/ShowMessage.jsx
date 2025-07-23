import ChatMessage from "../ChatMessage/ChatMessage"
import image from "../../assets/chat-bg-1.png"

const ShowMessage = ({ user }) => {
    return (
        <div className="overflow-y-auto h-full px-2 py-4 bg-gradient-to-b from-white to-blue-50 rounded-b-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-blue-50 [&::-webkit-scrollbar-thumb]:bg-blue-200 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
            <div className="p-3">
                <ChatMessage user={user} />
            </div>
        </div>
    )
}

export default ShowMessage