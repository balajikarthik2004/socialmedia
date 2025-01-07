import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// UPDATE USER
router.put("/:id", async (req, res) => {
    const {userId, updatedUser} = req.body;
    if(userId === req.params.id) {
        if(updatedUser.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                updatedUser.password = await bcrypt.hash(updatedUser.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        try {
            await User.findByIdAndUpdate(req.params.id, {$set : updatedUser});
            res.status(200).json("Account has been updated");
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can update only your account");
    }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("Account has been deleted");
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can only delete your account");
    }
});

// GET USER
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...userData} = user._doc;
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// FOLLOW USER
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id); // other user
            const currUser = await User.findById(req.body.userId); // me
            if(user.isPrivate) {
                await user.updateOne({$push: {requestedBy: currUser._id}});
                await currUser.updateOne({$push: {requestedTo: user._id}});
                res.status(200).json("Follow request has been sent");
            }
            else if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push: {followers: currUser._id}});
                await currUser.updateOne({$push: {following: user._id}});
                res.status(200).json("User has been followed");
            } 
            else {
                res.status(403).json("You already follow this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can't follow yourself");
    }
});

// UNFOLLOW USER
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currUser = await User.findById(req.body.userId);
            if(user.followers.includes(currUser._id)) {
                await user.updateOne({$pull: {followers: currUser._id}});
                await currUser.updateOne({$pull: {following: user._id}});
                res.status(200).json("User has been unfollowed");
            } else {
                res.status(403).json("You don't follow this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can't unfollow yourself");
    }
});

// ACCEPT FOLLOW REQUEST
router.put("/:id/accept", async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // other person
        const currUser = await User.findById(req.body.userId); // me
        if(user.requestedTo.includes(currUser._id)){
            // remove me from other person's requestedTo list
            // add me in other person's following list
            await user.updateOne({$pull: {requestedTo: currUser._id}, $push: {following: currUser._id}});
            // remove other person from my requestedBy list
            // add other person to my followers list
            await currUser.updateOne({$pull: {requestedBy: user._id}, $push: {followers: user._id}});
            res.status(200).json("Follow request accepted");
        } else {
            res.status(400).json("No follow request found from this user")
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// REJECT FOLLOW REQUEST
router.put("/:id/reject", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const currUser = await User.findById(req.body.userId);
        if(user.requestedTo.includes(currUser._id)) {
            await user.updateOne({$pull: {requestedTo: currUser._id}});
            await currUser.updateOne({$pull: {requestedBy: user._id}});
            res.status(200).json("Follow request rejected");
        } else {
            res.status(400).json("No follow request found from this user");
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;