import { Server } from "socket.io";

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: { origin: "*" },
    });

    let users = [];
    let activeUsersInChat = {};

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("addUser", (userId) => {
            const socketId = socket.id;
            if(!users.some((user) => user.userId === userId)){
                // add userId and sockedId to users array
                users.push({userId, socketId});
            }
            io.emit("getUsers", users);
        })

        // send and get message
        socket.on("sendMessage", ({senderId, recieverId, content}) => {
            const reciever = users.find((user) => user.userId === recieverId);
            io.to(reciever.socketId).emit("getMessage", { senderId, content });
        })

        socket.on("sendNotification", ({ recieverId, notification }) => {
            const reciever = users.find((user) => user.userId === recieverId);
            notification.createdAt = Date.now();
            io.to(reciever.socketId).emit("getNotification", notification);
        })

        socket.on("follow", ({targetUserId, sourceUserId}) => {
            const targetUser = users.find((user) => user.userId === targetUserId);
            io.to(targetUser.socketId).emit("getFollowed", sourceUserId);
        })

        socket.on("unfollow", ({targetUserId, sourceUserId}) => {
            const targetUser = users.find((user) => user.userId === targetUserId);
            io.to(targetUser.socketId).emit("getUnfollowed", sourceUserId);
        })

        socket.on("sendRequest", ({targetUserId, sourceUserId}) => {
            const targetUser = users.find((user) => user.userId === targetUserId);
            io.to(targetUser.socketId).emit("getRequest", sourceUserId);
        })

        socket.on("acceptRequest", ({targetUserId, sourceUserId}) => {
            const targetUser = users.find((user) => user.userId === targetUserId);
            io.to(targetUser.socketId).emit("getRequestAccepted", sourceUserId);
        })

        socket.on("rejectRequest", ({targetUserId, sourceUserId}) => {
            const targetUser = users.find((user) => user.userId === targetUserId);
            io.to(targetUser.socketId).emit("getRequestRejected", sourceUserId);
        })

        socket.on("joinChatPage", ({ userId, chatId }) => {
            // Add user to the chat's active list
            if (!activeUsersInChat[chatId]) {
              activeUsersInChat[chatId] = [];
            }
            if (!activeUsersInChat[chatId].includes(userId)) {
              activeUsersInChat[chatId].push(userId);
            }
        
            // Notify all users in the chat
            io.emit("activeUsersInChat", activeUsersInChat[chatId]);
          });
        
          socket.on("leaveChatPage", ({ userId, chatId }) => {
            // Remove user from the chat's active list
            if (activeUsersInChat[chatId]) {
              activeUsersInChat[chatId] = activeUsersInChat[chatId].filter((id) => id !== userId);
        
              // If no users left, remove the chat entry
              if (activeUsersInChat[chatId].length === 0) {
                delete activeUsersInChat[chatId];
              }
            }
        
            // Notify all users in the chat
            io.emit("activeUsersInChat", activeUsersInChat[chatId] || []);
          });

        socket.on("refetchUnreadChats", ({ userId }) => {
            const user = users.find((user) => user.userId === userId);
            io.to(user.socketId).emit("checkUnreadChats");
        })

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            // remove user from users array
            users = users.filter(user => user.socketId !== socket.id);
            io.emit("getUsers", users);
        })
    })
}

export default initializeSocket;