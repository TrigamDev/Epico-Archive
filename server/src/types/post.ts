import Comment from "./comment";
import Image from "./image";
import Tag from "./tag";

interface Post {
    image: Image,
    id: string,
    tags: Tag[],
    favorites: number,
    comments: Comment[],
    timestamp: number,
};

export default Post;