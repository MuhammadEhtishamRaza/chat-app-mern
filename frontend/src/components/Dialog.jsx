import React from 'react';

export default function Dialog({ open, title, message, onClose }) {
    if (!open) return null;
    return (
        <div className="dialog-backdrop">
            <div className="dialog-box">
                {title && <h3 className="dialog-title">{title}</h3>}
                <div className="dialog-message">{message}</div>
                <button className="dialog-close-btn" onClick={onClose}>OK</button>
            </div>
        </div>
    );
} 