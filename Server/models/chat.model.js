import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    members: { type: Array },
    lastMessage: { type: Object },
    unreadMessagesCount: { type: Number, default: 0 }
}, { timestamps: true });

const chatModel = mongoose.model("Chat", chatSchema);
export default chatModel;