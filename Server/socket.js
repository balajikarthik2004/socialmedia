import { Server } from "socket.io";

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: { origin: "*" },
    });

    let users = [];

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

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            // remove user from users array
            users = users.filter(user => user.socketId !== socket.id);
            io.emit("getUsers", users);
        })
    })
}

export default initializeSocket;