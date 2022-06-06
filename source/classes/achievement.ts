import { BASE_NAMES } from "../utils/constants";

export class Achievement {
    private name: string;
    private stars: number;
    private current: number;
    private target: number;
    private prompt: string;
    private village: string;
    
    constructor (resolved_object: any) {
        this.name = resolved_object.name
        this.stars = resolved_object.stars
        this.current = resolved_object.value
        this.target = resolved_object.target
        this.prompt = resolved_object.info
        this.village = BASE_NAMES[resolved_object.village]
    }

    getName (): string {
        return this.name;
    }

    getStars (): number {
        return this.stars;
    }

    getCurrent (): number {
        return this.current;
    }

    getTarget (): number {
        return this.target;
    }

    getPrompt (): string {
        return this.prompt;
    }

    getVillage (): string {
        return this.village;
    }

    isFinished (): boolean {
        return this.current >= this.target;
    }

    toJSON (): Object {
        return {
            name: this.name,
            stars: this.stars,
            current: this.current,
            target: this.target,
            prompt: this.prompt,
            village: this.village
        }
    }
}
