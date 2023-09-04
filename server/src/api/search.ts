import { Tag } from "../models/tag.ts";
import PostModel, { Post } from "../models/post.ts";
import { assertPost, assertTag } from "../util/types.ts";

async function search(req: any, res: any) {
    // Checks
    if (!req.body?.tags) { res.status(400).json({ error: "No tags provided" }); return; }

    let tags = req.body?.tags as Tag[];
    let posts = await searchPostsByTag(tags);
    res.status(200).json({ posts });
};

async function searchPostsByTag(tags: Tag[]) {
    let posts = await PostModel.find().exec();
    
    // Grab all the posts that have the tags
    let filteredPosts: Post[] = [];
    for (let i = 0; i < posts.length; i++) {
        let post: Post = assertPost(posts[i] as Post);
        let hasAllTags = true;
        for (let j = 0; j < tags.length; j++) {
            let tag: Tag = assertTag(tags[j] as Tag);
            let hasTag = false;
            for (let k = 0; k < post.tags.length; k++) {
                let postTag = post.tags[k];
                if (postTag.value === tag.value && postTag.type === tag.type && postTag.safe === tag.safe) { hasTag = true; break; };
            }
            if (!hasTag) { hasAllTags = false; break; };
        }
        if (hasAllTags) {
            let trimmedPost: Post = assertPost(post);
            filteredPosts.push(trimmedPost);
        }
    }

    return filteredPosts;
}

export default search;