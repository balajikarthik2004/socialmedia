import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";

const app = express();
const port = 8000;
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Could not connect to MongoDB", error));

// middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// api endpoints
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});