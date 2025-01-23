import express from "express";
import { createPost, deletePost, handleLike, handleSave, getTimelinePosts, getUserPosts }
from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", createPost);
router.delete("/:id", deletePost);
router.put("/:id/like", handleLike);
router.put("/:id/save", handleSave);
router.get("/timeline/:userId", getTimelinePosts);
router.get("/userPosts/:userId", getUserPosts);

export default router;
