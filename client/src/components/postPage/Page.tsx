import "../../styles/post/Post.css";

import React from "react";
import { useParams } from "react-router-dom";
import { on, emit } from "../../util/events.ts";

import Post from "../../models/Post.ts";
import Tag from "../../models/Tag.ts";
import { get } from "../../util/api.ts";

import Mininav from "./Mininav.tsx";
import LinkList from "./LinkList.tsx";
import TagList from "./TagList.tsx";
import PostData from "./PostData.tsx";

function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = React.useState<Post>();
    const [editMode, setEditMode] = React.useState<boolean>(false);

    const loadPost = async () => {
        const res = await get(`post/${postId}`);
        setPost(res);
    }

    // Fetch the poost from the database
    React.useEffect(() => { loadPost(); });

    on('post-save-data', (post: any) => {
        console.log(post);
    });

    return (
        <div id="post">
            <div className="post-left">
                <Mininav editMode={editMode} setEditMode={setEditMode} reload={loadPost}/>
                <div id="content">
                    <PostData post={post as Post} editMode={editMode} />
                    <LinkList post={post as Post} />
                    <TagList tags={post?.tags as Tag[]} edit={false}/>
                </div>
            </div>
            <div className="post-right">
                <div className="post-img">
                    <img src={post?.image?.url}
                        alt={post?.image?.title}
                        title={post?.tags.map((tag: Tag) => tag.value).join(", ")}
                        id={post?.image?.title}
                    />
                </div>
            </div>
        </div>
    )
}

export default PostPage;