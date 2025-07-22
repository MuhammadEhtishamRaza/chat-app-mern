import Login from "../components/Login/Login";

const LoginPage = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Welcome Back!</h2>
            <Login />
        </div>
    </div>
);

export default LoginPage;