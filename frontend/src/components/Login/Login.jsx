import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-gray-700 mb-1" htmlFor="username">Username</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3">
                    <FaUser className="text-blue-500 mr-2" />
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="w-full p-2 bg-transparent focus:outline-none"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3">
                    <FaLock className="text-blue-500 mr-2" />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full p-2 bg-transparent focus:outline-none"
                        required
                    />
                </div>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-indigo-700 transition">
                Login
            </button>
            <div className="text-center text-sm mt-2">
                Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
            </div>
        </form>
    );
};

export default Login;