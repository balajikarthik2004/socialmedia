import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true, max: 25 },
    username: { type: String, required: true, max: 20, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    coverPicture: { type: String, default: "" },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    requestedTo: { type: Array, default: [] },
    requestedBy: { type: Array, default: [] },
    blockedUsers: { type: Array, default: [] },
    isPrivate: { type: Boolean, default: false },
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);
export default userModel;