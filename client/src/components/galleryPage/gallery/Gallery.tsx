import "../../../styles/Gallery.css";

import React from "react";

import Post from "../../../models/Post.ts";
import Image from "./Image.tsx";

function Gallery() {
    const [posts, setPosts] = React.useState<Post[]>([]);

    React.useEffect(() => {
        async function loadPosts() {
            const baseUrl = window.location.origin.split(":").slice(0, 2).join(":");
            const res = await fetch(`${baseUrl}:5050/api/posts`, { method: "GET" })
            const data = await res.json();
            data.sort((a: Post, b: Post) => {
                return b.image.timestamp - a.image.timestamp;
            });
            setPosts(data as Post[]);
        }
        loadPosts();
    }, []);

    return (
        <div className="gallery">
            {posts.map((post) => (
                <Image key={post.image.id} post={post} />
            ))}
        </div>
    )
}

export default Gallery;