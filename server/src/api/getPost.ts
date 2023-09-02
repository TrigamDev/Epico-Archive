import PostModel, { Post } from "../models/post.ts";

async function getPost(req: any, res: any) {
    let id = req.body?.id as number;
    // Search for image from database by ID
    let post: Post = await PostModel.findOne({ id: id }) as Post;
    post = {
        image: post?.image,
        id: post?.id,
        tags: post?.tags,
        favorites: post?.favorites,
        comments: post?.comments,
        timestamp: post?.timestamp,
    } as Post;

    if (post) res.status(200).json(post);
    else res.status(404).json({ error: 'Image not found' });
};

export default getPost;