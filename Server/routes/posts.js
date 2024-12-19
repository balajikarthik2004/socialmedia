import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";

const router = express.Router();

// CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.updateOne({$set: req.body});
            res.status(200).json("Post updated successfully");
        } else {
            res.status(403).json("You cannot update other person's post")
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted successfully");
        } else {
            res.status(403).json("You cannot delete other person's post")
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// LIKE or DISLIKE POST
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("Post has been liked");
        } else {
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json("Post has been disliked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET a POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

// TIMELINE POSTS
router.get("/timeline/all", async (req, res) => {
    try {
        const currUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currUser._id});
        const friendPosts = await Promise.all(
            currUser.following.map((friendId) => {
                return Post.find({userId : friendId});
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (error) {
        res.status(500).json(error);
    }
});


export default router;