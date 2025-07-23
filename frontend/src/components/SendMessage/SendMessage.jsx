import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { getSocket } from "../../socket/socket";
import { useActionState } from "react";

const SendMessage = ({ receiverId, onMessageSent }) => {
    const [message, setMessage] = useState("");

    const sendMessageAction = async (prevState, formData) => {
        const msg = formData.get("message");
        if (!msg.trim()) return;

        // Send message to backend (persist in DB)
        await fetch(`http://localhost:5000/api/message/send/${receiverId}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg }),
        });

        // Emit socket event for real-time update
        const socket = getSocket();
        if (socket) {
            socket.emit("sendMessage", { receiverId, content: msg });
        }

        // Clear the input after sending
        setMessage("");
        if (onMessageSent) onMessageSent();
    };

    const [error, submitAction, isPending] = useActionState(sendMessageAction, null);

    return (
        <form action={submitAction} className="flex items-center p-3 bg-gradient-to-r from-blue-100 to-blue-200 border-t-2 border-blue-700 shadow">
            <input
                type="text"
                className="border-none focus:outline-none w-full bg-transparent text-blue-900 placeholder:text-blue-400 font-medium p-2 rounded-lg"
                id="send-message"
                name="message"
                placeholder="Type your message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                autoComplete="off"
                required
            />
            <button
                type="submit"
                className="ml-3 p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition shadow"
                disabled={isPending}
            >
                <IoSend color="white" size={22} />
            </button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default SendMessage;