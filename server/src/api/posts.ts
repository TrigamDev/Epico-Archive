import PostModel from '../models/post.ts';

async function getAllPosts(req: any, res: any) {
    let posts = await PostModel.find().exec();
    res.status(200).json({ posts });
}

export default getAllPosts;