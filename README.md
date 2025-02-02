# FriendsZone - A Social Media Application

## 📌 Overview

FriendsZone is a modern social media application where users can connect, share posts, and interact with others through likes, comments, and follow requests. The platform allows users to manage their privacy by setting their profiles to public or private, ensuring controlled access to their content. Additionally, FriendsZone supports real-time notifications and messaging, enhancing user engagement.

## 🚀 Features

- **User Authentication & Security**
  - Secure login and registration with JWT-based authentication.
  - Password encryption using bcrypt.
- **User Interaction & Social Features**
  - Users can follow and unfollow each other.
  - Private profiles require follow requests for content access.
  - Users can change profile visibility (public/private).
- **User Privacy & Online Status**
  - Block and unblock users.
  - View online friends.
- **Posts & Engagement**
  - Share posts.
  - Like, comment, and save posts.
  - View saved and liked posts.
- **Real-Time Chat & Notifications**
  - Send direct messages in real-time.
  - Receive real-time notifications for likes, comments, follow requests, and messages.
- **File Uploads & Media Handling**
  - Upload profile pictures, cover photos, and media files via Multer.
- **Security & Performance Enhancements**
  - API protection using JWT authentication middleware.
  - Enhanced security with Helmet and rate limiting.
  - Logging and debugging with Morgan.

## 🛠 Tech Stack

### **Frontend:**

- **React.js** (Vite for fast builds)
- **Tailwind CSS** (for styling)
- **Material UI** (for UI components)
- **Axios** (for API communication)
- **React-Toastify** (for user interaction feedback)

### **Backend:**

- **Node.js & Express.js** (for server-side logic)
- **MongoDB & Mongoose** (for database)
- **JWT** (for authentication & authorization)
- **Bcrypt.js** (for password encryption)
- **Multer** (for file uploads)
- **Morgan** (for logging)
- **Helmet** (for security enhancements)

### **Real-Time Features:**

- **Socket.io** (for managing real-time messaging & notifications)

## ⚙️ Installation & Setup

### **1. Clone the Repository**

```sh
git clone https://github.com/rajvir2003/FriendsZone-SocialMediaApp.git
cd FriendsZone-SocialMediaApp
```

### **2. Set Up the Backend**

```sh
cd backend
npm install
```

- Create a `.env` file in the `backend` directory and add the following variables:
  ```env
  MONGO_URL=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  ```
- Start the backend server:

```sh
npm run server
```

### **3. Set Up the Frontend**

```sh
cd ../frontend
npm install
```

- Create a `.env` file in the `frontend` directory and add:
  ```env
  VITE_API_URL=http://localhost:8000
  VITE_WS_URL=ws://localhost:8000
  ```
- Start the frontend server:

```sh
npm run dev
```

