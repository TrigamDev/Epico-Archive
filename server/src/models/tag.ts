import { Schema, model } from "mongoose";
import Tag from "../types/tag";

const tagSchema = new Schema<Tag>({
    value: { type: String, required: true },
    type: { type: String, required: true },
    safe: { type: Boolean, required: false, default: true }
});

export default model<Tag>("Tag", tagSchema);