import { IoSend } from "react-icons/io5";

const SendMessage = () => {
    return (
        <div className="flex items-center p-2 bg-blue-400 rounded-md">
            <input type="text" className="border-none focus-visible:outline-none w-full focus-within:text-blue-900 placeholder:text-blue-600 bg-blue-200 p-2 rounded-sm" id="send-message" name="message" placeholder="Send Message" />
            <button className="cursor-pointer ml-2 mr-1"><IoSend color="white" size={"20px"} /></button>
        </div>
    )
}

export default SendMessage