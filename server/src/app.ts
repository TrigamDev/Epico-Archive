import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";

import ImageModel from "./models/image.ts";

import upload from "./api/upload.ts";
import post from "./api/post.ts";
import image from "./api/image.ts";

const app = express();
const jsonParser = bodyParser.json();

app.get("/", async (req, res) => {
    const images = await ImageModel.find().exec();
    res.status(200).json({ images });
});

app.use(express.static("../assets"));

// Api
app.post("/api/upload", jsonParser, async (req, res) => { upload(req, res) });
app.post("/api/post", jsonParser, async (req, res) => { post(req, res) });
app.get("/api/image", jsonParser, async (req, res) => { image(req, res) });

export default app;