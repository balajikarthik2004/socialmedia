import express from "express";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

const router = express.Router();

// GET COMMENTS FROM A PARTICULAR POST
router.get("/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({postId: req.params.postId});
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
});

// ADD COMMENT TO A POST
router.put("/", async (req, res) => {
    const newComment = new Comment(req.body);
    try {
        await Post.findByIdAndUpdate(newComment.postId, {$inc: { commentCount: 1 }});
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE COMMENT FROM A POST
router.delete("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const post = await Post.findById(comment.postId);
        // only comment owner or post owner can delete comments
        if(comment.userId === req.body.userId || post.userId === req.body.userId) {
            await post.updateOne({$inc: {commentCount: -1}});
            await comment.deleteOne();
            res.status(200).json("Comment deleted successfully");
        } else {
            res.status(403).json("You cannot delete other person's comment");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;