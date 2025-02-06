# FriendsZone - Social Media Application 🚀

## Overview

FriendsZone is a modern, feature-rich social media application that enables users to connect, share posts, and interact in real time. Users can engage with each other through likes, comments, follow requests, and private messaging.

This platform prioritizes user privacy by allowing profile visibility settings and block functionality. Additionally, real-time notifications and chat enhance user engagement. The app also leverages Cloudinary for secure media storage, ensuring optimized performance and seamless file management.

[![FriendsZone Demo Video](https://i.ytimg.com/vi/1dKsqrG8FAk/hqdefault.jpg)](https://www.youtube.com/watch?v=1dKsqrG8FAk)

## Key Features

### 🔐 User Authentication & Security
- Secure login & registration using JWT-based authentication.
- Password encryption with bcrypt.js.
- Session security with HTTP-only cookies.

### 👥 User Interaction & Social Features
- Follow & unfollow users.
- Private profiles require follow requests for content access.
- Block & unblock users.
- Online status visibility for friends.

### 📝 Posts & Engagement
- Create & share posts with text, images, and videos.
- Like, comment, and save posts.
- View liked & saved posts.

### 💬 Real-Time Chat & Notifications
- 1-on-1 real-time messaging.
- Receive instant notifications for:
  - Likes
  - Comments
  - Follow requests
  - Messages

### 🖼 Media Handling (Cloudinary Integration)
- Upload profile pictures, cover photos, and post media (images & videos).
- Cloudinary is used for secure and optimized media storage.
- Old profile/cover pictures are automatically deleted from Cloudinary when updated.

### 🔒 Security & Performance Enhancements
- JWT-based authentication middleware for API protection.
- Helmet.js for securing HTTP headers.
- Rate limiting to prevent abuse.
- Morgan for logging & debugging.

## 🛠 Tech Stack

### Frontend
- ⚡ React.js (Vite for fast builds)
- 🎨 Tailwind CSS (for modern, responsive UI)
- 🖌 Material UI (for UI components)
- 📡 Axios (for API communication)
- 🔔 React-Toastify (for user feedback)

### Backend
- 🟢 Node.js & Express.js (for server-side logic)
- 🍃 MongoDB & Mongoose (for database management)
- 🔑 JWT (for authentication & authorization)
- 🔒 Bcrypt.js (for password encryption)
- 📂 Multer (for handling file uploads)
- 📜 Morgan (for logging & debugging)
- 🛡 Helmet.js (for security enhancements)

### Real-Time Features
- 📡 Socket.io (for instant messaging & notifications)

### Media Storage
- ☁️ Cloudinary (for secure and optimized image & video uploads)

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/rajvir2003/FriendsZone-SocialMediaApp.git
cd FriendsZone-SocialMediaApp
```

### 2️⃣ Backend Setup
```bash
cd Backend
npm install
```
#### Environment Variables
Create a `.env` file in the `Backend` directory and add:
  ```env
  MONGO_URL=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  ```
Start the backend server:
  ```bash
  npm start
  ```

By default, the backend runs on http://localhost:8000.

### 3️⃣ Frontend Setup

```bash
cd ../Frontend
npm install
```

#### Environment Variables
Create a `.env` file in the `Frontend` directory and add:
  ```env
  VITE_API_URL=http://localhost:8000
  VITE_WS_URL=ws://localhost:8000
  ```
Start the Frontend Server
  ```bash
  npm run dev
  ```

By default, the frontend runs on http://localhost:5173.
