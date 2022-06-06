export class Label {
    private name: string;
    private icon_urls: any;
    
    constructor (resolved_object: any) {
        this.name = resolved_object.name;
        this.icon_urls = resolved_object.iconUrls;
    }

    getName (): string {
        return this.name;
    }

    getIconURL (size: string): string | undefined {
        if (this.icon_urls.hasOwnProperty(size)) {
            return this.icon_urls[size]
        } else return undefined;
    }

    toJSON (): Object {
        return {
            name: this.name,
            icon_urls: this.icon_urls
        }
    }
}