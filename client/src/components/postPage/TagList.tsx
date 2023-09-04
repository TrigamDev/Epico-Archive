import "../../styles/post/TagList.css";

import Tag from "../../models/Tag.ts";

import characterIcon from "../../assets/icons/tags/character.svg";
import artistIcon from "../../assets/icons/tags/artist.svg";
import expressionIcon from "../../assets/icons/tags/expression.svg";

interface TagListProps {
    tags: Tag[];
}

interface TagProps {
    value: string;
    type: string;
}

function TagList(props: TagListProps) {
    return (
        <div className="tag-list">
            {props?.tags?.map((tag) => <Tagged key={`${tag.value}_${tag.type}`} value={tag.value} type={tag.type} />)}
        </div>
    )
}

function Tagged(props: TagProps) {
    return (
        <div className="tag">
            <div className="tag-icon">
                <img className="icon-img" src={getIcon(props.type)} alt={props.type} />
            </div>
            <span id="tag-value">{props.value}</span>
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