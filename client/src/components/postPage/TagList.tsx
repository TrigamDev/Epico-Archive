import "../../styles/post/TagList.css";

import Tag from "../../models/Tag.ts";

import closeIcon from "../../assets/icons/tags/delete.svg";
import characterIcon from "../../assets/icons/tags/character.svg";
import artistIcon from "../../assets/icons/tags/artist.svg";
import expressionIcon from "../../assets/icons/tags/expression.svg";

interface TagListProps {
    tags: Tag[];
    edit: boolean;
}

interface TagProps {
    value: string;
    type: string;
    edit: boolean;
}

function TagList(props: TagListProps) {
    return (
        <div className="tag-list">
            {props?.tags?.map((tag) => <Tagged key={`${tag.value}_${tag.type}`} value={tag.value} type={tag.type} edit={props.edit}/>)}
        </div>
    )
}

function Tagged(props: TagProps) {
    const sound = new Audio("/sounds/button/generic.mp3");
    const playSound = () => { sound.currentTime = 0; sound.play(); };
    let close = null;
    if (props.edit) { close = (
        <div className="tag-icon">
            <img className="icon-img" src={closeIcon} alt="delete" title="Delete Tag"/>
        </div>
    )};
    return (
        <div className="tag" onMouseDown={playSound}>
            <div className="tag-icon">
                <img className="icon-img" src={getIcon(props.type)} alt={props.type} title={props.type} />
            </div>
            <span id="tag-value">{props.value}</span>
            {close}
        </div>
    )
}

function getIcon(type: string) {
    switch (type) {
        case "character": return characterIcon;
        case "artist": return artistIcon;
        case "expression": return expressionIcon;
        default: return "";
    }
}

export default TagList;