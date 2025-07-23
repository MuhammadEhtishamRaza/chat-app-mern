
const NoChatScreen = () => (
    <div className="flex flex-col items-center justify-center h-full text-blue-800">
        <svg width="80" height="80" fill="none" viewBox="0 0 24 24">
            <path fill="#3b82f6" d="M12 2a10 10 0 0 0-7.07 17.07l-1.41 1.41a1 1 0 0 0 1.41 1.41l1.41-1.41A10 10 0 1 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
            <circle cx="8" cy="10" r="1" fill="#3b82f6" />
            <circle cx="16" cy="10" r="1" fill="#3b82f6" />
            <path stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" d="M8.5 15c1.5 1 5.5 1 7 0" />
        </svg>
        <h2 className="mt-6 text-2xl font-bold">No Chat Selected</h2>
        <p className="mt-2 text-blue-800">Select a user to start chatting!</p>
    </div>
);

export default NoChatScreen;