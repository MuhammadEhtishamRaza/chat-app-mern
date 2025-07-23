import { useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import ChatScreen from "../components/ChatScreen/ChatScreen";

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className="grid grid-cols-4 h-screen">
            <SideBar onUserClick={setSelectedUser} />
            <ChatScreen selectedUser={selectedUser} />
        </div>
    )
}

export default ChatPage