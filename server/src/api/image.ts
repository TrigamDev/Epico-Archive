import ImageModel, { Image } from "../models/image.ts";

async function getImage(req: any, res: any) {
    let id = req.body?.id as number;
    // Search for image from database by ID
    let img = await ImageModel.findOne({ id: id });
    if (img) res.status(200).json(img);
    else res.status(404).json({ error: 'Image not found' });
};

export default getImage;