import express from "express";
import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

const router = express.Router();

// SEND A MESSAGE
router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        const chat = await Chat.findById(savedMessage.chatId);
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
          }
        await chat.updateOne({ lastMessage: {
            content: savedMessage.content,
            createdAt: savedMessage.createdAt
        } })
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL MESSAGES IN A CHAT
router.get("/:chatId", async (req, res) => {
    try {
        const messages = await Message.find({chatId: req.params.chatId});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;