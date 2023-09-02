import TagModel, { Tag } from "../models/tag.ts";

export async function checkTags(tags: Tag[]) {
    for (let tag of tags) {
        tag = tag as Tag;
        if (!tag.value) tag.value = "unknown";
        if (!tag.type) tag.type = "unknown";
        if (!tag.safe) tag.safe = true;

        let existingTag = await TagModel.findOne({ value: tag.value, type: tag.type }).exec();
        if (!existingTag) {
            let newTag = new TagModel(tag);
            await newTag.save();
        }
    }

    return tags;
};

export function uniqueTags(tags: Tag[]) {
    let uniqueTags = [] as Tag[];
    for (let tag of tags) {
        tag = tag as Tag;
        if (!uniqueTags.find(t => t.value === tag.value && t.type === tag.type)) uniqueTags.push(tag);
    }
    return uniqueTags;
}