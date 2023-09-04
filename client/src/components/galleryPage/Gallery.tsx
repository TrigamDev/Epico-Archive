import "../../styles/gallery/Gallery.css";

import React from "react";

import Post from "../../models/Post.ts";
import Image from "./Image.tsx";

function Gallery() {
    const [posts, setPosts] = React.useState<Post[]>([]);

    React.useEffect(() => {
        async function loadPosts() {
            const baseUrl = window.location.origin.split(":").slice(0, 2).join(":");
            const res = await fetch(`${baseUrl}:5050/api/posts`, { method: "GET" })
            const data = await res.json() as Post[];
            setPosts(data);
        }
        loadPosts();
    }, []);

    const sort = (a: Post, b: Post) => {
        const aDate = new Date(a.image.timestamp);
        const bDate = new Date(b.image.timestamp);
        return bDate.getTime() - aDate.getTime();
    }

    return (
        <div className="gallery">
            {posts.sort(sort).map((post) => (
                <Image key={post.image.id} post={post} />
            ))}
        </div>
    )
}

export default Gallery;