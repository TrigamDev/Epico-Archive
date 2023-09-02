import Image from "./Image.ts";
import Tag from "./Tag.ts";
import Comment from "./Comment.ts";

interface Post {
    image: Image,
    id: number,
    tags: Tag[],
    favorites: number,
    comments: Comment[],
    timestamp: number,
};

export default Post;