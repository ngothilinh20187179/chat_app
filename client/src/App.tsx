import './App.css'
import "tailwindcss";
import ChatPanel from './components/ChatPanel';
import { useState } from 'react';
import authService from './api/authService';

function App() {
  const userLinh = {
    username: "Linh",
    email: "linh@example.com",
    password: "password123"
  };

  const userLinh1 = {
    username: "Susan",
    email: "susan@example.com",
    password: "password123"
  };

  const [show, setShow] = useState(true);
  const [authLeft, setAuthLeft] = useState<{ user: any, token: string } | null>(null);
  const [authRight, setAuthRight] = useState<{ user: any, token: string } | null>(null);

  const handleLoginAll = async () => {
    try {
      const [resLeft, resRight]: any = await Promise.all([
        authService.login({ usernameOrEmail: userLinh.email, password: userLinh.password }),
        authService.login({ usernameOrEmail: userLinh1.email, password: userLinh1.password })
      ]);

      if (resLeft.data.success && resRight.data.success) {
        setAuthLeft({ user: resLeft.data.data.user, token: resLeft.data.data.token });
        setAuthRight({ user: resRight.data.data.user, token: resRight.data.data.token });
        setShow(false);
      }
    } catch (err) {
      alert("Login failed!");
    }
  }

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      <h1 className="text-center py-2 text-2xl font-bold text-black border-b">Welcome to my Chat App</h1>
      {show && (
        <button
          onClick={handleLoginAll}
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all active:scale-95 shadow-lg"
        >
          Login Both Users
        </button>
      )}

      <div className="flex flex-1 overflow-hidden divide-x-2 divide-gray-300">
        <div className="flex-1 h-full overflow-hidden">
          <ChatPanel
            userData={userLinh}
            colorTheme="blue"
            auth={authLeft}
            receiveFromId={authRight?.user?._id}
            receiveFromUser={authRight?.user?.username}
          />
        </div>

        <div className="flex-1 h-full overflow-hidden">
          <ChatPanel
            userData={userLinh1}
            colorTheme="purple"
            auth={authRight}
            receiveFromId={authLeft?.user?._id}
            receiveFromUser={authLeft?.user?.username}
          />
        </div>
      </div>
    </div>
  )
}
export default App
