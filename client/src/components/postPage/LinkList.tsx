import "../../styles/post/LinkList.css";

import React from "react";

import newTab from "../../assets/icons/links/newtab.svg";
import copy from "../../assets/icons/links/copy.svg";
import copyLink from "../../assets/icons/links/link.svg";
import download from "../../assets/icons/links/download.svg";
import layered from "../../assets/icons/links/layered.svg";

function LinkList(props: ListProps) {
    const links = [
        { action: "Open in New Tab", icon: newTab },
        { action: "Copy Image", icon: copy },
        { action: "Copy Link", icon: copyLink },
        { action: "Download Image", icon: download },
    ];

    if (props.layeredUrl) links.push({ action: "Download Layered", icon: layered });

    return (
        <div className="link-list">
            {links.map((link) => linkButton(link.action, link.icon))}
        </div>
    );
};

function linkButton(action: string, icon: string) {
    return (
        <div className="link-button" id={action.replace(' ', '-').toLocaleLowerCase()} key={action}>
            <img src={icon} alt={action} title={action} className="link-icon"/>
        </div>
    );
};

interface ListProps {
    imageUrl: string | undefined;
    layeredUrl: string | undefined;
}

export default LinkList;