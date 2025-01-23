import express from "express";
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  hasUnreadNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/", createNotification);
router.get("/:userId", getUserNotifications);
router.put("/mark-as-read", markAsRead);
router.get("/:userId/has-unread", hasUnreadNotifications);

export default router;
