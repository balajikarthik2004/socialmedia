import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

// Create a new notification
router.post("/", async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(500).json({ error: "Failed to create notification" });
  }
});

// Get all notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// Mark notifications as read
router.put("/mark-as-read", async (req, res) => {
  try {
    const { notificationIds } = req.body;
    await Notification.updateMany(
      { _id: { $in: notificationIds } },
      { $set: { isRead: true } }
    );
    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark notifications as read" });
  }
});

// CHECK UNREAD NOTIFICATIONS
router.get("/has-unread-notifications/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const hasUnreadNotifications = await Notification.exists({
      userId,
      isRead: false,
    });
    res.status(200).json({ hasUnreadNotifications: Boolean(hasUnreadNotifications) });
  } catch (error) {
    console.error("Error checking unread notifications:", error);
    res.status(500).json({ error: "Failed to check unread notifications" });
  }
});

export default router;