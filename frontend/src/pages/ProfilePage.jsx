import { useEffect, useState } from "react";
import { FaUser, FaVenusMars } from "react-icons/fa";
// import image from "../assets/image.svg";

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/user/me", {
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                    // console.log("Login Successful")
                    // console.log(data);
                }
            } catch (err) {
                console.error("Error: ", err.message)
                setUser(null);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-700">
            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg flex flex-col items-center">
                <div className="relative mb-6">
                    <img
                        src={user?.profilePic}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-lg object-cover"
                    />
                    <span className="absolute bottom-2 right-2 block w-5 h-5 bg-green-400 border-2 border-white rounded-full"></span>
                </div>
                <h2 className="text-3xl font-extrabold text-blue-700 mb-2">
                    {user ? user.fullName || user.username : "Loading..."}
                </h2>
                <p className="text-blue-500 mb-6 text-lg">
                    @{user ? user.username : ""}
                </p>
                <div className="w-full space-y-4">
                    <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 shadow">
                        <FaUser className="text-blue-500 text-xl" />
                        <span className="text-blue-900 font-medium">
                            {user ? user.bio || "No bio provided" : ""}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 shadow">
                        <FaVenusMars className="text-blue-500 text-xl" />
                        <span className="text-blue-900 font-medium capitalize">
                            {user ? user.gender || "Not specified" : ""}
                        </span>
                    </div>
                </div>
                <button className="mt-8 px-8 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow hover:from-blue-600 hover:to-indigo-700 transition">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;