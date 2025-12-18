# 💬 Realtime MERN Chat Application

## 🎯 Overview
A real-time chat application built using the MERN stack and Socket.IO to handle bidirectional communication.

✨ Core Features
- Real-time Messaging
- User Management
- Room/Chat Management

## 🛠️ Tech Stack

Frontend
- React, Typescript
- Redux
- Tailwind CSS
- Socket.IO

Backend
- Node.js and Express.js
- MongoDB and Mongoose
- Socket.IO

## Test Demo (BE - postman)
- Postman: 
++ login 2 user (e.g User0, User1)
++ connect socket  2 user (e.g User0, User1) (add access token when connect)
++ add event: receiveMessage (User0), sendMessage (User1)
++ send message (User1 send to User0): 
```bash
# Tab Message - Postman
{
  "recipientId": "6942b70c32cfbfed236de792", 
  "content": "Hi Linh, I'm Linh1"
}
```
++ check receiveMessage in User0

## 🚀 Quick Start

### Prerequisites
- Node.js
- MongoDB
- Understanding the basics of Socket.io (Handshake, Connection, Emit & Listen), jsonwebtoken.

### Installation & Run

1. Clone the repository
```bash
git clone https://github.com/ngothilinh20187179/chat_app
cd chat_app
```

Backend Setup
```bash
cd server
npm install
```

Setup .env file
```bash
MONGODB_ATLAS_URI=...
PORT=3000
NODE_ENV="development"
JWT_SECRET=...
TOKEN_EXPIRATION = "1d"
```

```bash
npm run dev
```

Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

## 🖥️ Project Initialization Guide

1. Install Node.js https://nodejs.org/en/download

2. MongoDB
- Make sure you have installed and running the MongoDB service locally. Or sign up and create a free Cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

3. Initialize the Project
```bash
mkdir chat-app
cd chat-app
mkdir client server
```

4. Initialize the Project Server
```bash
cd server
npm init -y
```
Install Dependencies
```bash
npm install express mongoose socket.io dotenv cors nodemon 
npm install -D typescript @types/node @types/express ts-node nodemon
npx tsc --init
```
Create an .env file in the server directory to store the environment variables:
```bash
MONGODB_ATLAS_URI=...
PORT=3000
NODE_ENV="development"
JWT_SECRET=...
TOKEN_EXPIRATION = '1d'
```

package.json
```bash
{
  ...
  "main": "server.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.ts",
    "dev": "nodemon server.ts"
  },
  "keywords": [ "express", "node", "nodemon"]
}
```

Run Server
```bash
npm run dev
```

5. Initialize the Client Project
```bash
cd ../client
npm create vite@latest . # Choose React, Typescript
```

Install Dependencies
```bash
npm install redux react-redux @reduxjs/toolkit socket.io-client
npm install tailwindcss @tailwindcss/vite
```

index.css # global style
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

vite.config.ts
```bash
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()],
})
```

Before use:
```bash
import "tailwindcss";
```

Run Client
```bash
npm run dev
```