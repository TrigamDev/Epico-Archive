import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

import ImageModel from "./models/image.ts";
import upload from "./api/upload.ts";

const app = express();
const jsonParser = bodyParser.json();

app.get("/", async (req, res) => {
    const images = await ImageModel.find().exec();
    res.status(200).json({ images });
});

app.post("/api/upload", jsonParser, async (req, res) => { upload(req, res) });

export default app;