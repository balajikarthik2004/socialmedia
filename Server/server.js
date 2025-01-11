import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
import chatRoute from "./routes/chats.js";
import messageRoute from "./routes/messages.js";
import multer from "multer";
import http from "http";
import initializeSocket from "./socket.js";

const app = express();
const port = 8000;
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Could not connect to MongoDB", error));

// create HTTP server
const server = http.createServer(app);
initializeSocket(server); // initialize socket.io

// middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use("/uploads",express.static('uploads'))

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, req.body.name); 
    },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        res.status(201).json("File uploaded successfully");
    } catch (error) {
        console.log(error)
    }
});

// api endpoints
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});