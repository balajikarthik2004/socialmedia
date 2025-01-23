import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    desc: { type: String, max: 500 },
    img: { type: String },
    video: { type: String },
    likes: { type: Array, default: [] },
    saves: { type: Array, default: [] },
    commentCount: { type: Number, default: 0 }
}, { timestamps: true });

const postModel = mongoose.model("Post", postSchema);
export default postModel;