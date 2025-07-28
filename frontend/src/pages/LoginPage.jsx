import { useState, useActionState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dialog from '../components/Dialog';
import socket from '../socket/socket.js';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const LoginNavigate = useNavigate()

    const handleSubmit = async (previousState, formData) => {
        const data = {
            email: formData.get("email"),
            password: formData.get("password")
        }
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include"
        })
        const result = await res.json()
        console.log(result)
        if (result.message == "Login Successful") {
            if (socket.connected) {
                socket.emit("new-user-add", result._id)
                console.log("Connected and sent new-user-add:", result._id, " with socket id: ", socket.id);
            } else {
                socket.once("connect", () => {
                    console.log("Connected to server: ", socket.id)
                    socket.emit("new-user-add", result._id)
                    console.log("Connected and sent new-user-add:", result._id, " with socket id: ", socket.id);
                })
            }
            setDialogOpen(true);
            setTimeout(() => {
                setDialogOpen(false);
                LoginNavigate("/chat")
            }, 1000)
        } else {
            console.error("Login Failed")
        }
    };
    const [error, submitAction, isLoading] = useActionState(handleSubmit, null)

    return (
        <div className="centered-container">
            <div className="card">
                <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Sign In</h2>
                <form action={submitAction} className="form">
                    <label htmlFor="login-username">Email</label>
                    <input
                        id="login-username"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        name="email"
                        required
                    />
                    <label htmlFor="login-password">Password</label>
                    <div className="password-input-group">
                        <input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            name="password"
                            required
                        />
                        <button type="button" className="show-hide" onClick={() => setShowPassword(v => !v)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {error && <div className="form-error">{error}</div>}
                    <button type="submit" className="form-btn" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p>Don't have an account? <Link to="/signup" className="switch-link">Sign up</Link></p>
            </div>
            <Dialog open={dialogOpen} title="Login Successful" message="You have logged in successfully." onClose={() => setDialogOpen(false)} />
        </div>
    );
} 