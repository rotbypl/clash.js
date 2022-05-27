const { ClientError, InvalidAuthorizationError, InvalidArgumentError } = require("./errors.js");

class Label {
    #name;
    #icon_urls;
    
    constructor (resolved_object) {
        this.#name = resolved_object.name;
        this.#icon_urls = resolved_object.iconUrls;
    }

    getName () {
        return this.#name;
    }

    getIconURL (size) {
        if (this.#icon_urls.hasOwnProperty(size)) {
            return this.#icon_urls[size]
        } else {
            throw new InvalidArgumentError("Given argument is not valid");
        }
    }

    toJSON () {
        return {
            name: this.#name,
            icon_urls: this.#icon_urls
        }
    }
}

module.exports = { Label };