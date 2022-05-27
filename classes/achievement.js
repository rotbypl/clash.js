class Achievement {
    #name;
    #stars;
    #current;
    #target;
    #prompt;
    #village;
    
    constructor (resolved_object) {
        this.#name = resolved_object.name
        this.#stars = resolved_object.stars
        this.#current = resolved_object.value
        this.#target = resolved_object.target
        this.#prompt = resolved_object.info
        this.#village = resolved_object.village
    }

    getName () {
        return this.#name;
    }

    getStars () {
        return this.#stars;
    }

    getCurrent () {
        return this.#current;
    }

    getTarget () {
        return this.#target;
    }

    getPrompt () {
        return this.#prompt;
    }

    getVillage () {
        return this.#village;
    }

    isFinished () {
        return this.#current >= this.#target;
    }

    toJSON () {
        return {
            name: this.#name,
            stars: this.#stars,
            current: this.#current,
            target: this.#target,
            prompt: this.#prompt,
            village: this.#village
        }
    }
}

module.exports = { Achievement };