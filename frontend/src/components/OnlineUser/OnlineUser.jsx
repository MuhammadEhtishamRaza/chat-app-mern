import image from "../../assets/image.svg"

const users = [
    { name: "Ali", last: "Hey, how are you?" },
    { name: "Hamza", last: "Let's meet at 5pm." },
    { name: "Ahmed", last: "Sent the files." },
    { name: "Yasir", last: "See you soon!" },
    { name: "Sara", last: "Typing..." },
    { name: "Ayesha", last: "Good night!" },
    { name: "Bilal", last: "Check this out!" },
];

const OnlineUser = () => {
    return (
        <div className="overflow-y-auto flex-1 px-2 py-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-blue-50 [&::-webkit-scrollbar-thumb]:bg-blue-200">
            <ul>
                {users.map((user, idx) => (
                    <li key={idx}>
                        <div className="flex items-center gap-4 p-3 mb-2 bg-gradient-to-r from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 transition cursor-pointer border-b-2 border-blue-200 rounded-xl shadow-sm">
                            <div className="relative">
                                <img src={image} alt="Profile" width={44} height={44} className="rounded-full border-2 border-blue-400 shadow" />
                                <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                            </div>
                            <div>
                                <p className="font-semibold text-blue-900">{user.name}</p>
                                <p className="text-xs text-blue-500 truncate max-w-[140px]">{user.last}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OnlineUser