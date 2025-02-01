import express from "express";
import { createPost, deletePost, handleLike, handleSave, getTimelinePosts, getUserPosts } from "../controllers/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage})

router.post("/", authMiddleware, upload.single("file"), createPost);
router.delete("/:id", authMiddleware, deletePost);
router.put("/:id/like", authMiddleware, handleLike);
router.put("/:id/save", authMiddleware, handleSave);
router.get("/timeline/:userId", authMiddleware, getTimelinePosts);
router.get("/userPosts/:userId", authMiddleware, getUserPosts);

export default router;
