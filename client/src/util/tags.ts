import Tag from "../models/Tag";

function getContentWarnings(tags: Tag[]) {
    const unsafeCategories = [ "nsfw", "gore" ];
    let warns: string[] = [];
    tags?.forEach(tag => {
        if (unsafeCategories.includes(tag.type)) warns.push(tag.type);
    });
    return warns;
}

export {
    getContentWarnings
}