import express from "express";
import { getComments, addComment, deleteComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:postId", getComments);
router.put("/", addComment);
router.delete("/:id", deleteComment);

export default router;