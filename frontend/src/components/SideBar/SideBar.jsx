import OnlineUser from "../OnlineUser/OnlineUser"
import SearchUser from "../SearchUser/SearchUser"


const SideBar = () => {
    return (
        <div className="h-screen flex flex-col border-r-2 border-[#2266ff]">
            <SearchUser />
            <OnlineUser />
        </div>
    )
}

export default SideBar