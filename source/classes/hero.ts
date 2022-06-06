import { BASE_NAMES } from "../utils/constants";

export class Hero {
    private name: string;
    private level: number;
    private max_level: number;
    private village: string;
    
    constructor (resolved_object: any) {
        this.name = resolved_object.name;
        this.level = resolved_object.level;
        this.max_level = resolved_object.maxLevel;
        this.village = BASE_NAMES[resolved_object.village];
    }

    getName (): string {
        return this.name;
    }

    getLevel (): number {
        return this.level;
    }

    getMaxLevel (): number {
        return this.max_level;
    }

    getVillage (): string {
        return this.village;
    }

    isMaxLevel (): boolean {
        return this.level == this.max_level;
    }

    isHomeBase (): boolean {
        return this.village == "home";
    }

    isBuilderBase (): boolean {
        return this.village == "builder";
    }

    toJSON (): Object {
        return {
            name: this.name,
            level: this.level,
            max_level: this.max_level,
            village: this.village
        }
    }
}