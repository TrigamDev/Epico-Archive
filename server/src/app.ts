import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


import uploadPost from "./api/uploadPost.ts";
import addTags from "./api/addTags.ts";

import search from "./api/search.ts";
import getPostList from "./api/getPostList.ts";
import getPost from "./api/getPost.ts";
import getImage from "./api/getImage.ts";

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static("../assets"));
app.use(cors());

// Get
app.get("/art/:id", jsonParser, async (req, res) => { getImage(req, res) });
app.get("/api/posts", jsonParser, async (req, res) => { getPostList(req, res) });
app.get("/api/post/:id", jsonParser, async (req, res) => { getPost(req, res) });
// Fetch
app.post("/api/search", jsonParser, async (req, res) => { search(req, res) });
// Upload/Change data
app.post("/api/post", jsonParser, async (req, res) => { uploadPost(req, res) });
app.post("/api/tag/:id", jsonParser, async (req, res) => { addTags(req, res) });

export default app;