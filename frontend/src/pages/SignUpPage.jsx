import React from 'react';
import { Link } from 'react-router-dom';
import Dialog from '../components/Dialog';
import './../App.css';

export default function SignupPage() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setTimeout(() => {
            setLoading(false);
            if (!name || !email || !password || !confirmPassword) {
                setError('Please fill in all fields.');
            } else if (password !== confirmPassword) {
                setError('Passwords do not match.');
            } else {
                setDialogOpen(true);
            }
        }, 1000);
    };

    return (
        <div className="centered-container">
            <div className="card">
                <div className="card-logo" aria-label="Chat App Logo" title="Chat App">💬</div>
                <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Sign Up</h2>
                <form onSubmit={handleSubmit} className="form">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        autoComplete="username"
                        required
                    />
                    <label>Password</label>
                    <div className="password-field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            autoComplete="new-password"
                            required
                        />
                        <button type="button" className="show-hide" onClick={() => setShowPassword(v => !v)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <label>Confirm Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        required
                    />
                    {error && <div className="form-error">{error}</div>}
                    <button type="submit" className="form-btn" disabled={loading}>
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <Link to="/login" className="switch-link">Already have an account? Login</Link>
            </div>
            <Dialog open={dialogOpen} title="Signup Successful" message="Your account has been created! (demo)" onClose={() => setDialogOpen(false)} />
        </div>
    );
}
