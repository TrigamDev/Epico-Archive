import { __filename, __dirname } from "../util/dir.ts";

import fs from "fs";
import fetch from "node-fetch";

import { getBaseURL, getFullURL } from "../util/req.ts";

import ImageModel, { Image } from "../models/image.ts";
import { Tag } from "../models/tag.ts";

async function upload(req: any, res: any) {
    // Fetch and save image
    let img: Image = await getImageData(req);
    img = await saveFiles(req, img);
    // Upload image to database
    const newImage = new ImageModel(img);
    await newImage.save();
    // Return image
    res.status(200).json(img);
};

// Core functionality
async function getImageData(req: any): Promise<Image> {
    const images = await ImageModel.find().exec();

    let url = req.body?.url as string;
    let layeredUrl = req.body?.layeredUrl as string;
    // Create image object
    let img: Image = {
        id: images.length + 1,
        url: url, layeredUrl: layeredUrl, thumbUrl: '',
        timestamp: req.body?.timestamp as number,
        tags: req.body?.tags as Tag[],
    } as Image;
    return img;
};

async function saveFiles(req: any, img: Image): Promise<Image> {
    let basePath: string = __dirname.replace('server/src', '') + `assets/art/${img.id}`;

    // Image
    let fetchedImage = await fetchURL(img.url);
    fs.writeFileSync(basePath + '.png', fetchedImage);
    img.url = getBaseURL(req) + `/art/${img.id}.png`;

    // Generate thumbnail
    // let thumb = fetchedImage;
    // let thumbPath = basePath + '_thumb.png';
    // thumb = await sharp(thumb).resize({ width: 500 }).toBuffer();

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

export default upload;