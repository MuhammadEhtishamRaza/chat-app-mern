import { useState, useEffect } from 'react';
import { useTheme } from '../main';
import Dialog from '../components/Dialog';

export default function ProfilePage() {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [userId, setUserId] = useState('');
    const [editing, setEditing] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { theme, toggleTheme } = useTheme();

    function getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    // Fetch current user data on mount
    useEffect(() => {
        const fetchCurrentUser = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetch("http://localhost:5000/api/user/me", {
                    method: "GET",
                    // credentials: "include"
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });
                if (response.ok) {
                    const userData = await response.json();
                    setName(userData.name || '');
                    setBio(userData.bio || '');
                    setUserId(userData._id || '');
                } else {
                    setError('Failed to fetch profile data.');
                }
            } catch (err) {
                setError('Error fetching profile data: ' + err);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentUser();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (!userId) {
                setError('User ID not found.');
                setLoading(false);
                return;
            }
            const response = await fetch(`http://localhost:5000/api/user/profile/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
                },
                // credentials: "include",
                body: JSON.stringify({ name, bio })
            });
            if (response.ok) {
                setEditing(false);
                setDialogOpen(true);
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to update profile.');
            }
        } catch (err) {
            setError('Error updating profile: ' + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="centered-container">
            <div className="card" style={{ position: 'relative', minWidth: 340 }}>
                <button className="theme-toggle" style={{ top: 24, right: 24, position: 'absolute' }} onClick={toggleTheme}>
                    {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>
                <div className="profile-avatar">{getInitials(name)}</div>
                <h2 style={{ color: 'var(--primary)', marginBottom: '1.2rem' }}>Profile</h2>
                {loading ? (
                    <div style={{ textAlign: 'center', margin: '1rem 0' }}>Loading...</div>
                ) : error ? (
                    <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
                ) : editing ? (
                    <form className="form" onSubmit={handleSave}>
                        <label>Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} />
                        <label>Bio</label>
                        <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} />
                        <button type="submit" className="form-btn" disabled={loading}>Save</button>
                    </form>
                ) : (
                    <div className="profile-info">
                        <div><strong>Name:</strong> {name}</div>
                        <div><strong>Bio:</strong> {bio}</div>
                        <button className="form-btn" onClick={() => setEditing(true)} style={{ marginTop: '1rem' }}>Edit</button>
                    </div>
                )}
            </div>
            <Dialog open={dialogOpen} title="Profile Updated" message="Your profile has been updated!" onClose={() => setDialogOpen(false)} />
        </div>
    );
} 