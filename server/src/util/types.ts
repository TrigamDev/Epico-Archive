import { Post, Image } from "../models/post.ts";
import { Tag } from "../models/tag.ts";
import { Comment } from "../models/comment.ts";

function assertImage(image: Image): Image {
    return {
        id: image?.id ? image?.id as number : 0,
        url: image?.url ? image?.url as string : "",
        layeredUrl: image?.layeredUrl ? image?.layeredUrl as string : "",
        title: image?.title ? image?.title as string : "image",
        timestamp: image?.timestamp ? image?.timestamp as number : 0,
    } as Image;
};

function assertPost(post: Post): Post {
    let img = assertImage(post?.image as Image);

    return {
        image: img,
        id: post?.id ? post?.id as number : 0,
        tags: post?.tags ? post?.tags as Tag[] : [] as Tag[],
        favorites: post?.favorites ? post?.favorites as number : 0,
        comments: post?.comments ? post?.comments as Comment[] : [] as Comment[],
        timestamp: post?.timestamp ? post?.timestamp as number : 0,
    } as Post;
};

function assertTag(tag: Tag): Tag {
    return {
        value: tag?.value ? tag?.value as string : "unknown",
        type: tag?.type ? tag?.type as string : "unknown",
        safe: tag?.safe ? tag?.safe as boolean : true
    }
}

export { assertImage, assertPost, assertTag };