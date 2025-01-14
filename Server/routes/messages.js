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
    let unreadCount = chat.unreadMessagesCount;
    if(!savedMessage.isRead) unreadCount++;
    await chat.updateOne({
      lastMessage: {
        senderId: savedMessage.senderId,
        content: savedMessage.content,
        createdAt: savedMessage.createdAt,
      },
      unreadMessagesCount: unreadCount
    });
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL MESSAGES IN A CHAT
router.get("/:chatId", async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/mark-as-read", async (req, res) => {
  try {
    const { messageIds, chatId } = req.body;

    // Update the isRead status for the given message IDs
    await Message.updateMany(
      { _id: { $in: messageIds } },
      { $set: { isRead: true } }
    );

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    await chat.updateOne({ unreadMessagesCount: 0 });

    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark messages as read" });
  }
});

export default router;
