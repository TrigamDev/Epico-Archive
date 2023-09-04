import { __filename, __dirname } from "../util/dir.ts";

import fs from "fs";
import fetch from "node-fetch";

import PostModel, { Post, Image } from "../models/post.ts";
import { Tag } from "../models/tag.ts";
import { Comment } from "../models/comment.ts";
import { checkTags } from "../util/tags.ts";

import { getBaseURL, getFullURL } from "../util/req.ts";
import { assertPost } from "../util/types.ts";

async function createPost(req: any, res: any) {
    // CHECKS
    if (!req.body?.image) return res.status(400).json({ error: "No image data provided" });
    if (!req.body?.image?.url) return res.status(400).json({ error: "No image url provided" });

    // Setup
    const posts = await PostModel.find().exec();
    let tagList: Tag[] = await checkTags(req.body?.tags);
    let img: Image = await getImageData(req);
    img = await saveFiles(req, img);

    // Create post
    let post: Post = {
        image: img,
        id: posts.length + 1,
        tags: tagList,
        favorites: 0,
        comments: [] as Comment[],
        timestamp: Date.now(),
    } as Post;
    post = assertPost(post);

    // Upload post to database
    try {
        const newPost = new PostModel(post);
        await newPost.save();
        res.status(200).json({ post: post });
    } catch (err) {
        res.status(500).json({ error: err });
        console.error(err);
    }
}

// Core functionality
async function getImageData(req: any): Promise<Image> {
    const posts = await PostModel.find().exec();
    // Setup
    let url = req.body?.image?.url as string;
    let layeredUrl = req.body?.image?.layeredUrl as string;
    let title = req.body?.image?.title as string;
    let timestamp = req.body?.image?.timestamp as number;
    // Create image object
    let img: Image = {
        id: posts.length + 1,
        url: url,
        layeredUrl: layeredUrl,
        title: title ? title : `image`,
        timestamp: timestamp ? timestamp : 0,
    } as Image;
    return img;
};

async function saveFiles(req: any, img: Image): Promise<Image> {
    let basePath: string = __dirname.replace('src', '') + `assets/art/${img.id}`;

    // Image
    let fetchedImage = await fetchURL(img.url);
    fs.writeFileSync(basePath + '.png', fetchedImage);
    img.url = getBaseURL(req) + `/art/${img.id}.png`;

    // Layered image
    let fetchedLayered = null;
    if (img.layeredUrl) {
        fetchedLayered = await fetchURL(img?.layeredUrl);
        let fileExtension = await getFileExtension(img.layeredUrl);
        if (fileExtension.length > 0) {
            let path = basePath + '_layered.' + fileExtension;
            fs.writeFileSync(path, fetchedLayered);
            img.layeredUrl = getBaseURL(req) + `/art/${img.id}_layered.${fileExtension}`;
        };
    };

    return img;
};

// Helpers
async function fetchURL(url: string): Promise<Buffer> {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    return Buffer.from(buffer);
};

async function getFileExtension(url:string): Promise<String> {
    const res = await fetch(url);
    let contentType = res.headers.get('content-type');
    return contentType?.split('/')[1] || '';
}

export default createPost;