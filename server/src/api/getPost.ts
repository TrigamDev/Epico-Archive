import PostModel, { Post } from "../models/post.ts";
import { assertPost } from "../util/types.ts";

async function getPost(req: any, res: any) {
    let id = req.params.id as number;
    if (!id) return res.status(400).json({ error: 'No ID provided' });
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
    // Search for post from database by ID
    let post: Post = await PostModel.findOne({ id: id }) as Post;
    if (!post) return res.status(404).json({ error: 'Post not found' });
    // Repond with post
    post = assertPost(post);
    if (post) res.status(200).json(post);
    else res.status(404).json({ error: 'Post not found' });
};

export default getPost;