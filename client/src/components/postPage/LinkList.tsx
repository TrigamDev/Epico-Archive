import "../../styles/post/LinkList.css";

import newTab from "../../assets/icons/links/newtab.svg";
import copy from "../../assets/icons/links/copy.svg";
import copyLink from "../../assets/icons/links/link.svg";
import download from "../../assets/icons/links/download.svg";
import layered from "../../assets/icons/links/layered.svg";
import Post from "../../models/Post";

function LinkList(props: ListProps) {

    const sounds = {
        generic: new Audio("/sounds/button/generic.mp3"),
    };

    const openInNewTab = () => {
        sounds.generic.currentTime = 0;
        sounds.generic.play();
        window.open(props.post?.image?.url, "_blank");
    };
    const copyImageToClip = async () => {
        sounds.generic.currentTime = 0;
        sounds.generic.play();
        try {
            const img = new Image();
            img.src = props.post?.image?.url as string;
            let fetched = await fetch(props.post?.image?.url as string);
            let blob = await fetched.blob();
            let item = new ClipboardItem({ [blob.type]: blob });
            await navigator.clipboard.write([item]);
        } catch (err) {
            alert("Your browser may not support copying images to the clipboard!")
        }
    }
    const copyLinkToClip = () => {
        sounds.generic.currentTime = 0;
        sounds.generic.play();
        navigator.clipboard.writeText(props.post?.image?.url as string);
    };
    const downloadImage = () => {
        sounds.generic.currentTime = 0;
        sounds.generic.play();
        downloadUrl(props.post?.image?.url as string, props.post?.image?.title as string);
    };
    const downloadLayered = () => {
        sounds.generic.currentTime = 0;
        sounds.generic.play();
        downloadUrl(props.post?.image?.layeredUrl as string, props.post?.image?.title as string);
    };

    let layeredButton = null;

    if (props.post?.image?.layeredUrl) {
        layeredButton = (
            <div className="link-button" id="download-layered" key="download-layered" onClick={downloadLayered}>
                <img src={layered} alt="Download Layered" title="Download Layered Image" className="link-icon"/>
            </div>
        )
    }

    return (
        <div className="link-list">
            <div className="link-button" id="open-in-new-tab" key="new-tab" onClick={openInNewTab}>
                <img src={newTab} alt="Open in New Tab" title="Open in New Tab" className="link-icon"/>
            </div>
            <div className="link-button" id="copy-image" key="copy-image" onClick={copyImageToClip}>
                <img src={copy} alt="Copy" title="Copy Image" className="link-icon"/>
            </div>
            <div className="link-button" id="copy-link" key="copy-link" onClick={copyLinkToClip}>
                <img src={copyLink} alt="Copy Link" title="Copy Link" className="link-icon"/>
            </div>
            <div className="link-button" id="download-image" key="download-image" onClick={downloadImage}>
                <img src={download} alt="Download" title="Download Image" className="link-icon"/>
            </div>
            {layeredButton}
        </div>
    );
};

interface ListProps {
    post: Post;
}

async function downloadUrl (downUrl: string, fileName: string) {
    let image = await fetch(downUrl);
    let blob = await image.blob();
    let url = window.URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    a.remove();
}

export default LinkList;