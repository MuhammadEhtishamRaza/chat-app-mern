import React from 'react';
import { Link } from 'react-router-dom';
import Dialog from '../components/Dialog';

export default function LoginPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
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
            if (!email || !password) {
                setError('Please enter both email and password.');
            } else {
                setDialogOpen(true);
            }
        }, 1000);
    };

    return (
        <div className="centered-container">
            <div className="card">
                <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Sign In</h2>
                <form onSubmit={handleSubmit} className="form">
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
                            autoComplete="current-password"
                            required
                        />
                        <button type="button" className="show-hide" onClick={() => setShowPassword(v => !v)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {error && <div className="form-error">{error}</div>}
                    <button type="submit" className="form-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <Link to="/signup" className="switch-link">Don't have an account? Sign up</Link>
            </div>
            <Dialog open={dialogOpen} title="Login Successful" message="You have logged in! (demo)" onClose={() => setDialogOpen(false)} />
        </div>
    );
} 