import { __filename, __dirname } from "../util/dir.ts";

import fs from "fs";
import fetch from "node-fetch";

import ImageModel from "../models/image.ts";
import Img from "../types/image.ts";
import Tag from "../types/tag.ts";

async function upload(req: any, res: any) {
    const images = await ImageModel.find().exec();
    // Image data
    let url = req.body?.url as string;
    let layeredURL = req.body?.layeredURL as string;
    let img: Img = {
        id: `img-${images.length + 1}`,
        url: url,
        timestamp: req.body?.timestamp as number,
        hasLayered: layeredURL ? true : false,
        tags: req.body?.tags as Tag[],
    } as Img;
    // Fetch image url
    let path = __dirname.replace('server/src', '') + `assets/art/${img.id}.png`;
    let fetched = await fetchURL(url);
    fs.writeFileSync(path, fetched);
    img.url = path;
    // Fetch layered
    if (img.hasLayered) {
        let fetchedLayered = await fetchURL(layeredURL);
        let fileExtension = await getFileExtension(layeredURL);

        if (fileExtension.length > 0) {
            let path = __dirname.replace('server/src', '') + `assets/art/${img.id}_layered.${fileExtension}`;
            fs.writeFileSync(path, fetchedLayered);
        }
    }

    // Upload image to database
    const newImage = new ImageModel(img);
    await newImage.save();

    res.status(200).json(img);
};

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