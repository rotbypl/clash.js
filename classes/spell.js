class Spell {
    #name;
    #level;
    #max_level;
    #village;
    
    constructor (resolved_object) {
        this.#name = resolved_object.name;
        this.#level = resolved_object.level;
        this.#max_level = resolved_object.maxLevel;
        this.#village = resolved_object.village;
    }

    getName () {
        return this.#name;
    }

    getLevel () {
        return this.#level;
    }

    getMaxLevel () {
        return this.#max_level;
    }

    getVillage () {
        return this.#village;
    }

    isMaxLevel () {
        return this.#level == this.#max_level;
    }

    isHomeBase () {
        return this.#village == "home";
    }

    isBuilderBase () {
        return this.#village == "builderBase";
    }

    toJSON () {
        return {
            name: this.#name,
            level: this.#level,
            max_level: this.#max_level,
            village: this.#village
        }
    }
}

module.exports = { Spell };