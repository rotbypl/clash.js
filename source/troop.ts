import { BASE_NAMES } from "../utils/constants";

export class Troop {
    private name: string;
    private level: number;
    private max_level: number;
    private village: string;
    private super_troop: boolean;
    
    constructor (resolved_object: any) {
        this.name = resolved_object.name;
        this.level = resolved_object.level;
        this.max_level = resolved_object.maxLevel;
        this.village = BASE_NAMES[resolved_object.village];
        this.super_troop = (resolved_object.superTroopIsActive || false);
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

    isSuperTroop (): boolean {
        return this.super_troop;
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
            village: this.village,
            super_troop: this.super_troop
        }
    }
}