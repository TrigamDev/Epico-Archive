import React from "react";
import "../../styles/Gallery.css";

import Post from "../../models/Post.ts";
import Tag from "../../models/Tag.ts";

function Gallery() {
    const [posts, setPosts] = React.useState<Post[]>([]);

    React.useEffect(() => {
        async function loadPosts() {
            const baseUrl = window.location.origin.split(":").slice(0, 2).join(":");
            const res = await fetch(`${baseUrl}:5050/api/posts`, { method: "GET" })
            const data = await res.json();
            data.posts.sort((a: Post, b: Post) => {
                return b.image.timestamp - a.image.timestamp;
            });
            setPosts(data.posts as Post[]);
        }
        loadPosts();
    }, []);

    return (
        <div className="gallery">
            {posts.map((post) => (
                <div className="gallery-img">
                    <img src={post.image.url} alt={tagsToString(post.tags)} title={tagsToString(post.tags)} />
                </div>
            ))}
        </div>
    )
}

function tagsToString(tags: Tag[]) {
    return tags.map((tag) => tag.value).join(", ");
}

export default Gallery;