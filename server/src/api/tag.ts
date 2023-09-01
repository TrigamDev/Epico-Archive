import PostModel, { Post } from "../models/post.ts";
import { Tag } from "../models/tag.ts";
import { checkTags, uniqueTags } from "../util/tags.ts";

async function tag(req: any, res: any): Promise<Tag[]> {
    // Fetch the post
    let post = await PostModel.findOne({ id: req.body?.id }).exec();
    if (!post) return res.status(404).json({ error: "Post not found" });
    
    // Add the tags
    let tagList: Tag[] = await checkTags(req.body?.tags);
    post.tags = uniqueTags(post.tags.concat(tagList));

    post.save();

    // Return the post
    return res.status(200).json({ post });
}

export default tag;