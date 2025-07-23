import SendMessage from "../SendMessage/SendMessage"
import ShowMessage from "../ShowMessage/ShowMessage"
import TopBar from "../TopBar/TopBar"
import NoChatScreen from "./NoChatScreen"
import image from "../../assets/chat-bg.png"

const ChatScreen = ({ selectedUser }) => {

    return (
        <div className="col-start-2 row-span-3 col-end-5">
            <div className="grid grid-rows-[1fr_9fr_1fr] grid-cols-1 h-screen">
                {selectedUser ? (
                    <>
                        <TopBar user={selectedUser} />
                        <ShowMessage user={selectedUser} />
                        <SendMessage receiverId={selectedUser._id} />
                    </>
                ) : (
                    <div className="row-span-3 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${image})` }}>
                        <NoChatScreen />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatScreen