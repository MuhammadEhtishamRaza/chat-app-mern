import { useActionState } from "react";
import { FaUser, FaEnvelope, FaLock, FaVenusMars } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {

  const Register = async (previousState, formData) => {
    try {
      const data = {
        fullName: formData.get("fullname"),
        username: formData.get("username"),
        gender: formData.get("gender"),
        // email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmpassword")
      };
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        return result.message || "Registration failed";
      }
      return null;
    } catch (error) {
      return "Error while registering: " + error.message;
    }
  }

  const [error, submitAction, isPending] = useActionState(Register, null);

  return (
    <form action={submitAction} className="space-y-6">
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="fullname">Full Name</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3">
          <FaUser className="text-indigo-500 mr-2" />
          <input
            type="text"
            id="fullname"
            placeholder="Enter your full name"
            className="w-full p-2 bg-transparent focus:outline-none"
            name="fullname"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="username">Username</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3">
          <FaUser className="text-indigo-500 mr-2" />
          <input
            type="text"
            id="username"
            placeholder="Choose a username"
            className="w-full p-2 bg-transparent focus:outline-none"
            name="username"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="gender">Gender</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3">
          <FaVenusMars className="text-indigo-500 mr-2" />
          <select
            id="gender"
            name="gender"
            className="w-full p-2 bg-transparent focus:outline-none"
            required
          >
            <option value="" disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      {/* <div>
        <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3">
          <FaEnvelope className="text-indigo-500 mr-2" />
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            className="w-full p-2 bg-transparent focus:outline-none"
            required
          />
        </div>
      </div> */}
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3">
          <FaLock className="text-indigo-500 mr-2" />
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            name="password"
            className="w-full p-2 bg-transparent focus:outline-none"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">Confirm Password</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3">
          <FaLock className="text-indigo-500 mr-2" />
          <input
            type="password"
            id="confirmPassword"
            name="confirmpassword"
            placeholder="Confirm your password"
            className="w-full p-2 bg-transparent focus:outline-none"
            required
          />
        </div>
      </div>
      <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:from-indigo-600 hover:to-blue-700 transition">
        {isPending ? "Submitting" : "Sign Up"}
      </button>
      <div className="text-center text-sm mt-2">
        Already have an account? <Link to="/" className="text-indigo-600 hover:underline">Login</Link>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
};

export default SignUp;