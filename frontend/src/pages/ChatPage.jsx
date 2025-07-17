import ChatScreen from "../components/ChatScreen/ChatScreen"
import SideBar from "../components/SideBar/SideBar"

const ChatPage = () => {
    return (
        <div className="grid grid-cols-4 h-screen">
            <SideBar />
            <ChatScreen />
        </div>
    )
}

export default ChatPage