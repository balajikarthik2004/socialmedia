import express from "express";
import { searchUser, updateUser, getUser, getFollowers, getFollowing, followUser,
unfollowUser, acceptRequest, rejectRequest, handleBlock, getSuggestions } 
from "../controllers/user.controller.js";
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
router.put("/:id", upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "coverPicture", maxCount: 1 }
]), updateUser);
router.get("/followers/:id", getFollowers);
router.get("/following/:id", getFollowing);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);
router.put("/:requesterId/acceptRequest", acceptRequest);
router.put("/:requesterId/rejectRequest", rejectRequest);
router.put("/:id/block", handleBlock);
router.get("/suggestions/:userId", getSuggestions);

export default router;
