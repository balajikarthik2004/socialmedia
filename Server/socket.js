import { Server } from "socket.io";

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: { origin: "http://localhost:5173" },
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

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            // remove user from users array
            users = users.filter(user => user.socketId !== socket.id);
            io.emit("getUsers", users);
        })
    })
}

export default initializeSocket;