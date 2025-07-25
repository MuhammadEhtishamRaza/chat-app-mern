import { useActionState, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dialog from '../components/Dialog';
import './../App.css';

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const SignUpNavigate = useNavigate();

    const handleSubmit = async (previousState, formData) => {
        const data = {
            "name": formData.get("name"),
            "email": formData.get("email"),
            "password": formData.get("password"),
            "confirmPassword": formData.get("confirmPassword")
        }
        const res = await fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
        const result = await res.json()
        if (result.message == "User created successfully") {
            setDialogOpen(true);
        }
        setTimeout(() => {
            setDialogOpen(false);
            SignUpNavigate("/login")
        }, 1500)
    };

    const [error, submitAction, isLoading] = useActionState(handleSubmit, null)

    return (
        <div className="centered-container">
            <div className="card">
                <div className="card-logo" aria-label="Chat App Logo" title="Chat App">💬</div>
                <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Sign Up</h2>
                <form action={submitAction} className="form">
                    <label htmlFor="signup-name">Name</label>
                    <input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        required
                    />
                    <label htmlFor="signup-email">Email</label>
                    <input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        name="email"
                        required
                    />
                    <label htmlFor="signup-password">Password</label>
                    <div className="password-input-group">
                        <input
                            id="signup-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            autoComplete="new-password"
                            name="password"
                            required
                        />
                        <button type="button" className="show-hide" onClick={() => setShowPassword(v => !v)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <label htmlFor="signup-confirm-password">Confirm Password</label>
                    <div className="password-input-group">
                        <input
                            id="signup-confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            name="confirmPassword"
                            required
                        />
                        <button type="button" className="show-hide" onClick={() => setShowConfirmPassword(v => !v)}>
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {error && <div className="form-error">{error}</div>}
                    <button type="submit" className="form-btn" disabled={isLoading}>
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <p>Already have an account? <Link to="/login" className="switch-link">Login</Link></p>
            </div>
            <Dialog open={dialogOpen} title="Signup Successful" message="Your account has been created successfully!" onClose={() => setDialogOpen(false)} />
        </div>
    );
}
