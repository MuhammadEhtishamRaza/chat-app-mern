import { useEffect, useState } from "react";
// import image from "../../assets/image.svg"

const OnlineUser = ({ onUserClick }) => {
    const [onlineUser, setOnlineUser] = useState([])

    useEffect(() => {
        const fetchOnlineUser = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/user/users", {
                    method: "GET",
                    credentials: "include",
                })
                const result = await res.json()
                setOnlineUser(result)
                // console.log(result)
            } catch (error) {
                console.error("Error while fetching Online User: ", error)
            }
        }
        fetchOnlineUser()
    }, [])

    // Function to handle user click
    const handleUserClick = (user) => {
        if (onUserClick) {
            onUserClick(user);
        }
    };

    return (
        <div className="overflow-y-auto flex-1 px-2 py-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-blue-50 [&::-webkit-scrollbar-thumb]:bg-blue-200">
            <ul>
                {onlineUser.map((user, idx) => (
                    <li key={idx}>
                        <div
                            className="flex items-center gap-4 p-3 mb-2 bg-gradient-to-r from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 transition cursor-pointer border-b-2 border-blue-200 rounded-xl shadow-sm"
                            onClick={() => handleUserClick(user)}
                        >
                            <div className="relative">
                                <img src={user.profilePic} alt="Profile" width={44} height={44} className="rounded-full border-2 border-blue-400 shadow" />
                                <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                            </div>
                            <div>
                                <p className="font-semibold text-blue-900 capitalize">{user.username}</p>
                                <p className="text-xs text-blue-500 truncate max-w-[70px]">
                                    {user.lastMessage && user.lastMessage.content ? user.lastMessage.content : ""}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OnlineUser