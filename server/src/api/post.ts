import PostModel, { Post } from "../models/post.ts";
import { Image } from "../models/image.ts";
import { Tag } from "../models/tag.ts";
import { Comment } from "../models/comment.ts";
import { checkTags } from "../util/tags.ts";

async function createPost(req: any, res: any) {
    const posts = await PostModel.find().exec();
    let tagList: Tag[] = await checkTags(req.body?.tags);
    let post: Post = {
        image: req.body?.image as Image,
        id: posts.length + 1,
        tags: tagList,
        comments: [] as Comment[],
        timestamp: Date.now(),
    } as Post;

    try {
        const newPost = new PostModel(post);
        await newPost.save();
        res.status(200).json({ post: newPost });
    } catch (err) {
        res.status(500).json({ error: err });
        console.error(err);
    }
}

export default createPost;