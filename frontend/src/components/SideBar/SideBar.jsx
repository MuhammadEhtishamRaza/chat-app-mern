import OnlineUser from "../OnlineUser/OnlineUser"
import SearchUser from "../SearchUser/SearchUser"
import { useEffect, useState } from "react"

const SideBar = ({ onUserClick }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/user/me", {
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (err) {
                console.error("Error while fetching:", err)
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className="h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-200 border-r-2 border-[#2266ff] shadow-xl">
            <div className="py-4 px-2">
                <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight text-center drop-shadow">ChatApp</h1>
                {user && (
                    <div className="text-center text-blue-900 font-semibold capitalize">
                        {user.username}
                    </div>
                )}
            </div>
            <SearchUser />
            <OnlineUser onUserClick={onUserClick} />
        </div>
    )
}

export default SideBar