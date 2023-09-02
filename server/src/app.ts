import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";

import ImageModel from "./models/image.ts";

import upload from "./api/upload.ts";
import post from "./api/post.ts";
import tag from "./api/tag.ts";

import image from "./api/image.ts";
import search from "./api/search.ts";
import posts from "./api/posts.ts";
import getPost from "./api/getPost.ts";

const app = express();
const jsonParser = bodyParser.json();

app.get("/", async (req, res) => {
    const images = await ImageModel.find().exec();
    res.status(200).json({ images });
});

app.use(express.static("../assets"));

// Upload/Change data
app.post("/api/upload", jsonParser, async (req, res) => { upload(req, res) });
app.post("/api/post", jsonParser, async (req, res) => { post(req, res) });
app.post("/api/tag", jsonParser, async (req, res) => { tag(req, res) });
// Fetch
app.post("/api/getimage", jsonParser, async (req, res) => { image(req, res) });
app.post("/api/getpost", jsonParser, async (req, res) => { getPost(req, res) });
app.post("/api/search", jsonParser, async (req, res) => { search(req, res) });
// Gets
app.get("/api/posts", jsonParser, async (req, res) => { posts(req, res) });

export default app;