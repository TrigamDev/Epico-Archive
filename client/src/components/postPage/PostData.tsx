import Post, { Image } from "../../models/Post";
import Tag from "../../models/Tag";
import { getContentWarnings } from "../../util/tags";
import { on, emit } from "../../util/events";

import React from "react";
import moment from "moment";

interface PostDataProps {
    post: Post;
    editMode: boolean;
}

interface ImageData {
    width: number,
    height: number,
    size: number,
    fileType: string | undefined
}

export default function PostData (props: PostDataProps) {

    const [imageData, setImageData] = React.useState<ImageData>();

    // Get the image stats
    React.useEffect(() => {
        async function getImageData() { const data = await getImgData(props?.post?.image as Image); setImageData(data); }
        getImageData();
    }, [props.post]);

    on("post-save", () => {
        // get title
        const title = document.getElementById("post-title") as HTMLInputElement;
        if (!title) return;
        // save to database
        const post = props.post;
        post.image.title = title.value;
        emit("post-save-data", post);
    });

    let title = null;
    if (props.editMode) {
        title = ( <input type="text" id="post-title" className="edit" defaultValue={props.post?.image?.title} /> )
    } else {
        title = ( <span id="post-title">{props.post?.image?.title}</span> )
    }

    return (
        <div id="post-data">
            {title}
            {imageStats(props.post as Post, imageData as ImageData)}
        </div>
    )
};

function imageStats(post: Post, imageData: ImageData) {
    let warns = getContentWarnings(post?.tags as Tag[]);
    if (warns.length === 0) warns = ["none"];

    return (
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