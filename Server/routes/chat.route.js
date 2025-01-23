import express from "express";
import { createChat, getChats, hasUnreadChats } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", getChats);
router.get("/:userId/has-unread", hasUnreadChats);

export default router;
