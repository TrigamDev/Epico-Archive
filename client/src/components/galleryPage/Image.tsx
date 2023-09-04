import "../../styles/gallery/Image.css";

import React from "react";

import Post from "../../models/Post.ts";
import Tag from "../../models/Tag.ts";

interface ImageProps {
    post: Post;
}

function GalleryImage(props: ImageProps) {
    const [data, setData] = React.useState<string>("");
    const [loaded, setLoaded] = React.useState<boolean>(false);

    React.useEffect(() => {
        async function generateThumbnail() {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = props.post.image.url;

            img.onload = function () {
                const compressed = getCompressedURL(img);
                setData(compressed);
            }
        }
        generateThumbnail();
    }, [props.post.image.url]);

    const handleImageLoad = () => {
        setLoaded(true);
    }

    let tagStr = tagsToString(props.post.tags);
    let parentClass = 'gallery-img ' + (loaded ? 'img-loaded' : 'img-loading');

    return (
        <a href={`/post/${props.post.id}`} className="gallery-img-link">
            <div className={ parentClass }>
                <img src={data} alt={tagStr} title={props.post?.image?.title} onLoad={handleImageLoad}/>
            </div>
        </a>
    )
}

export default GalleryImage;

function tagsToString(tags: Tag[]) {
    return tags.map((tag) => tag.value).join(", ");
};

function getCompressedURL(img: HTMLImageElement) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.height = 278;
    
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx?.drawImage(img, x, y, img.width * scale, img.height * scale);

    const cropped = cropCanvas(canvas, x, y, img.width * scale, img.height * scale);

    return cropped.toDataURL("image/webp", 0.45);
};

function cropCanvas(canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number) {
    const cropped = document.createElement("canvas");
    cropped.width = width;
    cropped.height = height;
    cropped.getContext("2d")?.drawImage(canvas, x, y, width, height, 0, 0, width, height);
    return cropped;
};