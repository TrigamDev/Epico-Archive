
import React from "react";
import { useParams } from "react-router-dom";

import Post from "../../models/Post.ts";

function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = React.useState<Post>();

    React.useEffect(() => {
        async function loadPosts() {
            const baseUrl = window.location.origin.split(":").slice(0, 2).join(":");
            const res = await fetch(`${baseUrl}:5050/api/getpost`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: postId }),
            });
            const data = await res.json();
            setPost(data as Post);
        }
        loadPosts();
    }, [ postId ]);
    return (
        <div>
            <h1>Post</h1>
            {post?.id}
            <img src={post?.image.url} alt="shit" />
        </div>
    )
}

export default PostPage;