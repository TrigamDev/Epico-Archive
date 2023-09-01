import ImageModel, { Image } from "../models/image.ts";

async function getImage(req: any, res: any) {
    let id = req.body?.id as number;
    // Search for image from database by ID
    let img: Image = await ImageModel.findOne({ id: id }) as Image;
    img = {
        id: img?.id,
        url: img?.url,
        layeredUrl: img?.layeredUrl,
        timestamp: img?.timestamp,
    } as Image;

    if (img) res.status(200).json(img);
    else res.status(404).json({ error: 'Image not found' });
};

export default getImage;