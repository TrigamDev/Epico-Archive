import PostModel from '../models/post.ts';

async function getAllPosts(req: any, res: any) {
    let posts = await PostModel.find().exec();
    // add Access-Control-Allow-Origin: * to the header, too
    res.set('Access-Control-Allow-Origin', '*');
    res.json(posts);
}

export default getAllPosts;