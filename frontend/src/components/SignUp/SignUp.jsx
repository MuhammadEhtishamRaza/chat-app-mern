import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="username">Username</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3">
          <FaUser className="text-indigo-500 mr-2" />
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Choose a username"
            className="w-full p-2 bg-transparent focus:outline-none"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3">
          <FaEnvelope className="text-indigo-500 mr-2" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 bg-transparent focus:outline-none"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3">
          <FaLock className="text-indigo-500 mr-2" />
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full p-2 bg-transparent focus:outline-none"
            required
          />
        </div>
      </div>
      <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:from-indigo-600 hover:to-blue-700 transition">
        Sign Up
      </button>
      <div className="text-center text-sm mt-2">
        Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
      </div>
    </form>
  );
};

export default SignUp;