import { Schema, model } from "mongoose";
import Image from "../types/image";

const imageSchema = new Schema<Image>({
    url: { type: String, required: true },
    id: { type: String, required: true },
    hasLayered: { type: Boolean, required: false, default: false },
    timestamp: { type: Number, required: false, default: 0 },
});

export default model<Image>("Image", imageSchema);