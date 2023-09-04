import "../../styles/post/Post.css";

import React from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import Post, { Image } from "../../models/Post.ts";
import Tag from "../../models/Tag.ts";
import { getContentWarnings } from "../../util/tags";
import { get } from "../../util/api.ts";

import Mininav from "./Mininav.tsx";
import LinkList from "./LinkList.tsx";
import TagList from "./TagList.tsx";

interface ImageData {
    width: number,
    height: number,
    size: number,
    fileType: string | undefined
}

function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = React.useState<Post>();
    const [imageData, setImageData] = React.useState<ImageData>();

    React.useEffect(() => {
        async function getPost() {
            const res = await get(`post/${postId}`);
            setPost(res);
        }
        getPost();
    }, [postId]);

    React.useEffect(() => {
        async function getImageData() {
            const data = await getImgData(post?.image as Image);
            setImageData(data);
        }
        getImageData();
    }, [post]);

    let warns = getContentWarnings(post?.tags as Tag[]);
    if (warns.length === 0) warns = ["none"];

    return (
        <div id="post">
            <div className="post-left">
                <Mininav />
                <div id="content">
                    <div id="post-data">
                        <span id="post-title">{post?.image?.title}</span>
                        <div id="post-info">
                            <span className="data">Post ID: {post?.id}</span>
                            <span className="data">Favorites: {post?.favorites}</span>
                            <span className="data">Created: {formatTimestamp(post?.image?.timestamp)}</span>
                            <span className="data">Uploaded: {formatTimestamp(post?.timestamp)}</span>
                            <span className="data">Resolution: {imageData?.width}x{imageData?.height}</span>
                            <span className="data">Size: {formatFileSize(imageData?.size)}</span>
                            <span className="data">File Type: {imageData?.fileType}</span>
                            <span className="data">Warnings: {warns.join(", ")}</span>
                        </div>
                    </div>
                    <LinkList 
                        imageUrl={post?.image?.url}
                        layeredUrl={post?.image?.layeredUrl}
                    />
                    <TagList tags={post?.tags as Tag[]} />
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

function formatTimestamp(timestamp: number | undefined) {
    let timezoneOffset = new Date().getTimezoneOffset();
    timestamp = (timestamp as number) - timezoneOffset;
    return moment(timestamp).format("M/D/YYYY h:mm:ss a");
}

async function getImgData(image: Image): Promise<ImageData> {
    const img = document.getElementById(image?.title as string) as HTMLImageElement;
    if (!img) return { width: 0, height: 0, size: 0, fileType: "" };
    // File Size
    const res = await fetch(img.src);
    const blob = await res.blob();
    const size = blob.size;
    // Other stuff
    const fileType = img.src.split(".").pop();
    const { naturalWidth: width, naturalHeight: height } = img;
    return { width, height, size, fileType };
}

function formatFileSize(fileSize: number | undefined) {
    if (!fileSize) return "0 B";
    if (fileSize < 1000) return `${fileSize} B`;
    else if (fileSize < 1000000) return `${Math.round(fileSize / 1000)} KB`;
    else if (fileSize < 1000000000) return `${Math.round(fileSize / 1000000)} MB`;
    else return `${Math.round(fileSize / 1000000000)} GB`;
}

export default PostPage;