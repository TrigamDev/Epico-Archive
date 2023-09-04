import PostModel, { Post } from "../models/post.ts";
import TagModel, { Tag } from "../models/tag.ts";
import { assertTag } from "./types.ts";

export async function checkTags(tags: Tag[]): Promise<Tag[]> {
    if (!tags || tags.length <= 0) return [] as Tag[];
    for (let tag of tags) {
        tag = assertTag(tag as Tag);

        let existingTag = await TagModel.findOne({ value: tag.value, type: tag.type }).exec();
        if (!existingTag) {
            let newTag = new TagModel(tag);
            await newTag.save();
        }
    };
    return tags;
};

export function uniqueTags(tags: Tag[]): Tag[] {
    let uniqueTags = [] as Tag[];
    for (let tag of tags) {
        tag = assertTag(tag as Tag);
        if (!uniqueTags.find(t => t.value === tag.value && t.type === tag.type)) uniqueTags.push(tag);
    }
    return uniqueTags as Tag[];
};