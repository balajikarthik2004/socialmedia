import express from "express";
import {
  createPost,
  deletePost,
  handleLike,
  handleSave,
  getTimelinePosts,
  getUserPosts,
} from "../controllers/post.controller.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage})

router.post("/", upload.single("file"), createPost);
router.delete("/:id", deletePost);
router.put("/:id/like", handleLike);
router.put("/:id/save", handleSave);
router.get("/timeline/:userId", getTimelinePosts);
router.get("/userPosts/:userId", getUserPosts);

export default router;
