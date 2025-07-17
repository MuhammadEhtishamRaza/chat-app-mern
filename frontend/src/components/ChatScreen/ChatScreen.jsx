import SendMessage from "../SendMessage/SendMessage"
import ShowMessage from "../ShowMessage/ShowMessage"
import TopBar from "../TopBar/TopBar"

const ChatScreen = () => {
    return (
        <div className="col-start-2 row-span-3 col-end-5">
            <div className="grid grid-rows-[1fr_9fr_1fr] grid-cols-1 h-screen">
                <TopBar />
                <ShowMessage />
                <SendMessage />
            </div>
        </div>
    )
}

export default ChatScreen