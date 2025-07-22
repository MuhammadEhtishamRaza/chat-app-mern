import { useActionState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const Login = async (previousState, formData) => {
        try {
            const data = {
                username: formData.get("username"),
                password: formData.get("password"),
            };
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (!res.ok) {
                return result.message || "Login failed";
            }
            navigate("/home")
            return null;
        } catch (error) {
            return "Error while login: " + error.message;
        }
    }

    const [error, submitAction, isPending] = useActionState(Login, null)

    return (
        <form action={submitAction} className="space-y-6">
            <div>
                <label className="block text-gray-700 mb-1" htmlFor="username">Username</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3">
                    <FaUser className="text-blue-500 mr-2" />
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        className="w-full p-2 bg-transparent focus:outline-none"
                        autoComplete="username"
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
                        name="password"
                        placeholder="Enter your password"
                        className="w-full p-2 bg-transparent focus:outline-none"
                        autoComplete="current-password"
                        required
                    />
                </div>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-indigo-700 transition">
                {isPending ? "Submitting" : "Login"}
            </button>
            <div className="text-center text-sm mt-2">
                Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
    );
};

export default Login;