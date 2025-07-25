import { useState } from 'react';
import { Link } from 'react-router-dom';
import Dialog from '../components/Dialog';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setTimeout(() => {
            setLoading(false);
            if (!username || !password) {
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
                    <label htmlFor="login-username">Email</label>
                    <input
                        id="login-username"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        autoComplete="username"
                        name="username"
                        required
                    />
                    <label htmlFor="login-password">Password</label>
                    <div className="password-input-group">
                        <input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
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
                    <button type="submit" className="form-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p>Don't have an account? <Link to="/signup" className="switch-link">Sign up</Link></p>
            </div>
            <Dialog open={dialogOpen} title="Login Successful" message="You have logged in! (demo)" onClose={() => setDialogOpen(false)} />
        </div>
    );
} 