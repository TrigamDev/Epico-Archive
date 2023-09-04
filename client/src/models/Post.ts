import Tag from "./Tag.ts";
import Comment from "./Comment.ts";

interface Image {
    id: number,
    url: string,
    layeredUrl?: string,
    title: string,
    timestamp: number,
};

interface Post {
    image: Image,
    id: number,
    tags: Tag[],
    favorites: number,
    comments: Comment[],
    timestamp: number,
};

export default Post;
export type { Image };