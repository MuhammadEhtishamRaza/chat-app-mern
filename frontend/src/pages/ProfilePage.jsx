import React from 'react';
import { useTheme } from '../main';
import Dialog from '../components/Dialog';

export default function ProfilePage() {
    const [name, setName] = React.useState('John Doe');
    const [bio, setBio] = React.useState('Hello! I love chatting.');
    const [editing, setEditing] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const { theme, toggleTheme } = useTheme();

    function getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    const handleSave = (e) => {
        e.preventDefault();
        setEditing(false);
        setDialogOpen(true);
    };

    return (
        <div className="centered-container">
            <div className="card" style={{ position: 'relative', minWidth: 340 }}>
                <button className="theme-toggle" style={{ top: 24, right: 24, position: 'absolute' }} onClick={toggleTheme}>
                    {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>
                <div className="profile-avatar">{getInitials(name)}</div>
                <h2 style={{ color: 'var(--primary)', marginBottom: '1.2rem' }}>Profile</h2>
                {editing ? (
                    <form className="form" onSubmit={handleSave}>
                        <label>Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} />
                        <label>Bio</label>
                        <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} />
                        <button type="submit" className="form-btn">Save</button>
                    </form>
                ) : (
                    <div className="profile-info">
                        <div><strong>Name:</strong> {name}</div>
                        <div><strong>Bio:</strong> {bio}</div>
                        <button className="form-btn" onClick={() => setEditing(true)} style={{ marginTop: '1rem' }}>Edit</button>
                    </div>
                )}
            </div>
            <Dialog open={dialogOpen} title="Profile Updated" message="Your profile has been updated! (demo)" onClose={() => setDialogOpen(false)} />
        </div>
    );
} 