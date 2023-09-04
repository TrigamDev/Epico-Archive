import { Schema, model } from "mongoose";

interface Tag {
    value: string,
    type: string,
    safe: boolean
};

const tagSchema = new Schema<Tag>({
    value: { type: String, required: true },
    type: { type: String, required: true },
    safe: { type: Boolean, required: false, default: true }
});

export default model<Tag>("Tag", tagSchema);
export { Tag };