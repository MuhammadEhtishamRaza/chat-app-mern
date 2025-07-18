import ChatMessage from "../ChatMessage/ChatMessage"


const ShowMessage = () => {
    return (
        <div className="overflow-y-auto h-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <div className="p-3">
                <ChatMessage />
            </div>
        </div>
    )
}

export default ShowMessage