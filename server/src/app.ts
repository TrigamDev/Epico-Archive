import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";

import ImageModel from "./models/image.ts";

import upload from "./api/upload.ts";
import post from "./api/post.ts";
import image from "./api/image.ts";
import tag from "./api/tag.ts";
import search from "./api/search.ts";
import posts from "./api/posts.ts";

const app = express();
const jsonParser = bodyParser.json();

app.get("/", async (req, res) => {
    const images = await ImageModel.find().exec();
    res.status(200).json({ images });
});

app.use(express.static("../assets"));

// Posts
app.post("/api/upload", jsonParser, async (req, res) => { upload(req, res) });
app.post("/api/post", jsonParser, async (req, res) => { post(req, res) });
app.post("/api/tag", jsonParser, async (req, res) => { tag(req, res) });
// Gets
app.get("/api/image", jsonParser, async (req, res) => { image(req, res) });
app.get("/api/search", jsonParser, async (req, res) => { search(req, res) });
app.get("/api/posts", jsonParser, async (req, res) => { posts(req, res) });

export default app;