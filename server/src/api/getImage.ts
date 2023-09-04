import fs from "fs";

import { __filename, __dirname } from "../util/dir.js";
import PostModel, { Post, Image } from "../models/post.js";

async function getArt(req: any, res: any) {
    let id = req.params.id;
    id = id.split(".")[0];
    const post: Post = await PostModel.findOne({ id: id }).exec() as Post;
    if (!post) return res.status(404).send("Image not found");
    const file = post.image.url.split("/").pop();

    // grab the image from <baseUrl>/assets/art/<id>
    let basePath: string = __dirname.replace('src', '') + `assets/art/${file}`;
    const img = fs.readFileSync(basePath);
    if (!img) return res.status(404).send("Image not found");
    res.writeHead(200, { "Content-Type": "image/png" });
    res.end(img, "binary");
    // res.send('hhh');
}

export default getArt;