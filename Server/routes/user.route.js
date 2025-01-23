import express from "express";
import { searchUser, updateUser, getUser, getFollowers, getFollowing,
followUser, unfollowUser, acceptRequest, rejectRequest, handleBlock, 
getSuggestions } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/search", searchUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.get("/followers/:id", getFollowers);
router.get("/following/:id", getFollowing);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);
router.put("/:requesterId/acceptRequest", acceptRequest);
router.put("/:requesterId/rejectRequest", rejectRequest);
router.put("/:id/block", handleBlock);
router.get("/suggestions/:userId", getSuggestions);

export default router;
