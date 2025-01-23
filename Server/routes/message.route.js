import express from "express";
import { getMessages, sendMessage, markAsRead } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/:chatId", getMessages);
router.post("/", sendMessage);
router.post("/mark-as-read", markAsRead);

export default router;
