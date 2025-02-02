import express from "express";
import { searchUser, updateUser, getUser, getFollowers, getFollowing, followUser,
unfollowUser, acceptRequest, rejectRequest, handleBlock, getSuggestions } 
from "../controllers/user.controller.js";
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

router.get("/search", searchUser);
router.get("/:id", getUser);
router.put("/:id", authMiddleware, upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "coverPicture", maxCount: 1 }
]), updateUser);
router.get("/followers/:id", getFollowers);
router.get("/following/:id", getFollowing);
router.put("/:id/follow", authMiddleware, followUser);
router.put("/:id/unfollow", authMiddleware, unfollowUser);
router.put("/:requesterId/acceptRequest", authMiddleware, acceptRequest);
router.put("/:requesterId/rejectRequest", authMiddleware, rejectRequest);
router.put("/:id/block", authMiddleware, handleBlock);
router.get("/suggestions/:userId", authMiddleware, getSuggestions);

export default router;