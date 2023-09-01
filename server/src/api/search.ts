import { Tag } from "../models/tag.ts";
import PostModel, { Post } from "../models/post.ts";

async function search(req: any, res: any) {
    let tags = req.body?.tags as Tag[];
    let posts = await searchPostsByTag(tags);
    res.status(200).json({ posts });
};

async function searchPostsByTag(tags: Tag[]) {
    let posts = await PostModel.find().exec();
    
    // Grab all the posts that have the tags
    let filteredPosts: Post[] = [];
    for (let i = 0; i < posts.length; i++) {
        let post: Post = posts[i] as Post;
        let hasAllTags = true;
        for (let j = 0; j < tags.length; j++) {
            let tag: Tag = tags[j] as Tag;
            let hasTag = false;
            for (let k = 0; k < post.tags.length; k++) {
                let postTag = post.tags[k];
                if (postTag.value === tag.value && postTag.type === tag.type && postTag.safe === tag.safe) { hasTag = true; break; };
            }
            if (!hasTag) { hasAllTags = false; break; };
        }
        if (hasAllTags) {
            // Generate new post with all the
            // database fat trimmed
            let trimmedPost: Post = {
                image: post?.image,
                id: post?.id,
                tags: post?.tags,
                favorites: post?.favorites,
                comments: post?.comments,
                timestamp: post?.timestamp,
            } as Post;
            filteredPosts.push(trimmedPost);
        }
    }

    return filteredPosts;
}

export default search;