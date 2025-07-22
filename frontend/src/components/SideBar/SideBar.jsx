import OnlineUser from "../OnlineUser/OnlineUser"
import SearchUser from "../SearchUser/SearchUser"

const SideBar = () => {
    return (
        <div className="h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-200 border-r-2 border-[#2266ff] shadow-xl">
            <div className="py-4 px-2">
                <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight mb-2 text-center drop-shadow">ChatApp</h1>
            </div>
            <SearchUser />
            <OnlineUser />
        </div>
    )
}

export default SideBar