import { Schema, model } from "mongoose";
import Img from "../types/image";
import Post from "../types/post";

const postSchema = new Schema<Post>({
    image: { type: Schema.Types.ObjectId, ref: "Image", required: true },
    id: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: false }],
    favorites: { type: Number, required: false, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment", required: false }],
    timestamp: { type: Number, required: false, default: 0 },
});

export default model<Post>("Post", postSchema);