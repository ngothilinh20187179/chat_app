import { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import messageService from '../api/messageService';

interface Message {
    _id?: string;
    sender: string | any;
    recipient?: string;
    content: string;
    createdAt?: string;
    time?: string;
}

interface ChatInterfaceProps {
    user: any;
    socket: Socket | null;
    themeClass: string;
    token: string;
    receiveFromId: string;
    receiveFromUser: string;
}

const ChatInterface = ({ user, socket, themeClass, token, receiveFromId, receiveFromUser }: ChatInterfaceProps) => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<any[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadHistory = async () => {
            if (!token || !receiveFromId) return;
            try {
                const res: any = await messageService.getChatHistory(receiveFromId, token);
                if (res.data?.success && res.data?.data?.messages) {
                    setChatHistory(res.data.data.messages);
                }
            } catch (err) {
                console.error("Error loading history:", err);
            }
        };
        loadHistory();
    }, [receiveFromId, token]);

    useEffect(() => {
        if (!socket) return;

        const handleReceiveMessage = (newMessage: Message) => {
            const isRelated = 
                newMessage.sender === receiveFromId || 
                (typeof newMessage.sender === 'object' && newMessage.sender._id === receiveFromId);

            if (isRelated) {
                setChatHistory((prev) => [...prev, newMessage]);
            }
        };

        socket.on('receiveMessage', handleReceiveMessage);

        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
        };
    }, [socket, receiveFromId]);


    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }, [chatHistory]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && socket) {
            const payload = {
                recipientId: receiveFromId,
                content: message,
            };

            socket.emit('sendMessage', payload);
            const localMsg = {
                ...payload,
                sender: user._id,
                createdAt: new Date().toISOString(),
            };
            
            setChatHistory((prev) => [...prev, localMsg]);
            setMessage('');
        }
    };

    const isMe = (msgSender: any) => {
        const senderId = typeof msgSender === 'object' ? msgSender._id : msgSender;
        return senderId === (user.userId || user._id);
    };

    return (
        <div className="flex flex-col h-full bg-white text-black">
            {/* Header */}
            <div className={`p-4 text-white font-bold flex items-center gap-2 shadow-sm ${themeClass}`}>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{receiveFromUser || "Unknown User"}</span>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f0f2f5]">
                {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex ${isMe(msg.sender) ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] p-3 rounded-lg shadow-sm ${
                            isMe(msg.sender)
                            ? `${themeClass} text-white rounded-br-none` 
                            : 'bg-white text-gray-800 rounded-bl-none'
                        }`}>
                            <p className="text-sm break-words">{msg.content}</p>
                            <p className={`text-[10px] mt-1 opacity-70 ${isMe(msg.sender) ? 'text-right' : 'text-left'}`}>
                                {msg.createdAt 
                                    ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                                    : 'Sending...'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Footer */}
            <form onSubmit={sendMessage} className="p-3 bg-gray-100 flex gap-2 border-t">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Send message to ${receiveFromUser}...`}
                    className="flex-1 px-4 py-2 bg-white rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    type="submit" 
                    disabled={!message.trim()} 
                    className={`p-2 rounded-full text-white transition-opacity ${themeClass} disabled:opacity-50`}
                >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;