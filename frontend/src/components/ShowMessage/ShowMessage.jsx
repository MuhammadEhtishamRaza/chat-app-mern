import ChatMessage from "../ChatMessage/ChatMessage"

const ShowMessage = () => {
    return (
        <div className="overflow-y-auto h-full px-2 py-4 bg-gradient-to-b from-white to-blue-50 rounded-b-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-blue-50 [&::-webkit-scrollbar-thumb]:bg-blue-200">
            <div className="p-3">
                <ChatMessage />
            </div>
        </div>
    )
}

export default ShowMessage