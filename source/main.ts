export { Client } from "./classes/client";

export function parseTag (tag: string): string {
    let parsed_tag: string = tag;
    
    if (tag[0] != "#") parsed_tag = `#${tag}`;
    parsed_tag = parsed_tag.toUpperCase();

    return parsed_tag;
}

export function toJSON (class_object: any): Object | undefined {
    if (typeof(class_object.toJSON) == "function") {
        return class_object.toJSON();
    } else return undefined;
}
