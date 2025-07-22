import { IoSend } from "react-icons/io5";

const SendMessage = () => {
    return (
        <div className="flex items-center p-3 bg-gradient-to-r from-blue-100 to-blue-200 border-t-2 border-blue-700 shadow">
            <input
                type="text"
                className="border-none focus:outline-none w-full bg-transparent text-blue-900 placeholder:text-blue-400 font-medium p-2 rounded-lg"
                id="send-message"
                name="message"
                placeholder="Type your message..."
            />
            <button className="ml-3 p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition shadow">
                <IoSend color="white" size={22} />
            </button>
        </div>
    )
}

export default SendMessage