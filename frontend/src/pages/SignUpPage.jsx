import SignUp from "../components/SignUp/SignUp";

const SignUpPage = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-700">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">Create Account</h2>
            <SignUp />
        </div>
    </div>
);

export default SignUpPage;