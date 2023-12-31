import { Schema, model } from "mongoose";
import { Tag } from "./tag.ts";
import { Comment } from "./comment.ts";

interface Image {
    id: number,
    url: string,
    layeredUrl?: string,
    title: string,
    timestamp: number,
};

interface Post {
    image: Image,
    id: number,
    tags: Tag[],
    favorites: number,
    comments: Comment[],
    timestamp: number,
};

const postSchema = new Schema<Post>({
    image: { type: Object, required: true },
    id: { type: Number, required: true },
    tags: [{ type: Object, required: false }],
    favorites: { type: Number, required: false, default: 0 },
    comments: [{ type: Object, required: false }],
    timestamp: { type: Number, required: false, default: 0 },
});

export default model<Post>("Post", postSchema);
export { Post, Image };