import { IoSend } from "react-icons/io5";

const SendMessage = () => {
    return (
        <div className="flex items-center p-2 bg-blue-400 rounded-md">
            <input type="text" className="border-none focus-visible:outline-none w-full focus:text-white placeholder:text-blue-600" id="send-message" name="message" placeholder="Send Message" />
            <button className="cursor-pointer"><IoSend color="white" /></button>
        </div>
    )
}

export default SendMessage