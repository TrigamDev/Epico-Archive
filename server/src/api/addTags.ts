import PostModel, { Post } from "../models/post.js";
import { Tag } from "../models/tag.js";
import { checkTags, uniqueTags } from "../util/tags.js";
import { assertPost } from "../util/types.js";

async function tag(req: any, res: any): Promise<Tag[]> {
    let postId = req.params?.id;
    if (!postId) return res.status(400).json({ error: "No ID provided" });
    if (isNaN(postId)) return res.status(400).json({ error: "Invalid ID" });

    // Fetch the post
    let post = await PostModel.findOne({ id: postId }).exec();
    if (!post) return res.status(404).json({ error: "Post not found" });
    
    // Add the tags
    let tagList: Tag[] = await checkTags(req.body?.tags);
    let newTags: Tag[] = uniqueTags(post.tags.concat(tagList));
    post.tags = newTags;

    // Save the post
    post.save();

    let returnPost = assertPost(post as Post);

    // Return the post
    return res.status(200).json({ post: returnPost });
}

export default tag;