import express from "express";
import Chat from "../models/Chat.js";

const router = express.Router();

// CREATE A NEW CHAT
router.post("/", async (req, res) => {
    const { senderId, recieverId } = req.body;
    try {
        // check if chat between these users already exists
        const chat = await Chat.findOne({ members: {$all: [senderId, recieverId]} });
        if(chat) return res.status(200).json(chat);
        const newChat = new Chat({
            members: [senderId, recieverId]
        });
        const savedChat = await newChat.save();
        res.status(201).json(savedChat);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL CHATS FOR A USER
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const chats = await Chat.find({ members: { $in: [userId] } })
        .sort({ updatedAt: -1 });
        const filteredChats = chats.map((chat) => {
            const senderId = chat.members.find((id) => id !== userId);
            return { _id: chat._id, senderId };
        });
        res.status(200).json(filteredChats);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;