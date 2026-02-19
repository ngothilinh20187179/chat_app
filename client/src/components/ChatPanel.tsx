import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import LoginForm from './LoginForm';
import ChatInterface from './ChatInterface';

interface ChatPanelProps {
    userData: {
        username: string;
        email: string;
        password: string;
    };
    colorTheme: 'blue' | 'purple';
    auth: { 
        user: any; 
        token: string; 
    } | null;
    receiveFromId?: string;
    receiveFromUser?: string;
}

const ChatPanel = ({ userData, colorTheme, auth, receiveFromId, receiveFromUser }: ChatPanelProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const themeClass = colorTheme === 'blue' ? 'bg-blue-600' : 'bg-purple-600';

    useEffect(() => {
        if (auth?.token) {
            const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
                auth: { token: auth.token } 
            });
            setSocket(newSocket);
            return () => {
                newSocket.close();
            };
        }
    }, [auth]);

    if (!auth) {
        return (
            <LoginForm
                defaultEmail={userData.email}
                defaultPassword={userData.password}
                onLoginSuccess={() => {}}
            />
        );
    }

    return (
        <div className="h-full border-r border-gray-200 overflow-hidden">
            <ChatInterface 
                user={auth.user} 
                token={auth.token} 
                socket={socket} 
                themeClass={themeClass}
                receiveFromId={receiveFromId || ""}
                receiveFromUser={receiveFromUser || ""}
            />
        </div>
    );
};

export default ChatPanel;