import { Schema, model } from "mongoose";

interface Image {
    id: number,
    url: string,
    layeredUrl?: string,
    timestamp: number,
};

const imageSchema = new Schema<Image>({
    id: { type: Number, required: true },
    url: { type: String, required: true },
    layeredUrl: { type: String, required: false },
    timestamp: { type: Number, required: false, default: 0 },
});

export default model<Image>("Image", imageSchema);
export type { Image };