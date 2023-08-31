import { Schema, model } from "mongoose";
import Comment from "../types/comment";

const commentSchema = new Schema<Comment>({
    id: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: String, required: true },
    timestamp: { type: Number, required: false, default: 0 },
});

export default model<Comment>("Comment", commentSchema);