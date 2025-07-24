import React from 'react';
import { useTheme } from '../main';

const loggedInUser = { id: 0, name: 'You', email: 'you@example.com' };
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
]

const messages = [
    { id: 1, sender: 'Alice', text: 'Hi there!' },
    { id: 2, sender: 'You', text: 'Hello!' },
    { id: 3, sender: 'Alice', text: 'How are you?' },
];

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export default function ChatPage() {
    const [input, setInput] = React.useState('');
    const [chatMessages, setChatMessages] = React.useState(messages);
    const [selectedUser, setSelectedUser] = React.useState(users[0]);
    const { theme, toggleTheme } = useTheme();

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setChatMessages([...chatMessages, { id: Date.now(), sender: 'You', text: input }]);
        setInput('');
    };

    return (
        <div className="chat-layout">
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
            <aside className="chat-sidebar">
                <div className="card-logo" style={{ margin: '0 auto 1.5rem auto' }} aria-label="Chat App Logo" title="Chat App">💬</div>
                {/* User info below logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, width: '100%', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span className="avatar" style={{ width: 40, height: 40, fontSize: '1.2rem' }}>{getInitials(loggedInUser.name)}</span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 600 }}>{loggedInUser.name}</span>
                            <span style={{ fontSize: '0.92rem', color: '#888' }}>{loggedInUser.email}</span>
                        </div>
                    </div>
                    <button title="Logout" aria-label="Logout" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', color: '#4f8cff', marginLeft: 4 }}>
                        🚪
                    </button>
                </div>
                <h3>Users</h3>
                <ul>
                    {users.map(user => (
                        <li
                            key={user.id}
                            className={user.id === selectedUser.id ? 'active' : ''}
                            onClick={() => setSelectedUser(user)}
                        >
                            <span className="avatar">{getInitials(user.name)}</span>
                            {user.name}
                        </li>
                    ))}
                </ul>
            </aside>
            <section className="chat-window">
                {/* Receiver info at top */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 18,
                    padding: '1.3rem 2rem 1rem 2rem',
                    borderBottom: '2.5px solid var(--primary)',
                    marginBottom: 12,
                    background: 'var(--glass-bg)',
                    borderRadius: '0 0 18px 18px',
                    boxShadow: '0 2px 12px rgba(79,140,255,0.10)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 2
                }}>
                    <span className="avatar" style={{ width: 54, height: 54, fontSize: '1.5rem', boxShadow: '0 2px 8px rgba(79,140,255,0.10)' }}>{getInitials(selectedUser.name)}</span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 700, fontSize: '1.18rem', color: 'var(--primary)' }}>{selectedUser.name}</span>
                        <span style={{ fontSize: '1rem', color: '#4f8cff', fontWeight: 500 }}>Online</span>
                    </div>
                </div>
                <div className="chat-messages">
                    {chatMessages.map(msg => (
                        <div key={msg.id} className={msg.sender === 'You' ? 'message own' : 'message'} style={msg.sender === 'You' ? { background: 'linear-gradient(90deg, #4f8cff 0%, #a770ef 100%)', color: '#fff', boxShadow: '0 2px 12px rgba(79,140,255,0.12)' } : {}}>
                            <span className="sender">{msg.sender}:</span> {msg.text}
                        </div>
                    ))}
                </div>
                <form className="chat-input" onSubmit={handleSend}>
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder={`Message ${selectedUser.name}`}
                    />
                    <button type="submit" aria-label="Send message">✈️</button>
                </form>
            </section>
        </div>
    );
} 