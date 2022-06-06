import axios from "axios";
import { MAIN_ENDPOINT, CLAN_ROLE_NAMES } from "../utils/constants";
import { Clan } from "./clan";
import { Achievement } from "./achievement";
import { Label } from "./label";
import { Hero } from "./hero";
import { Troop } from "./troop";
import { Spell } from "./spell";

export class Player {
    private api_token: string;
    private name: string;
    private tag: string;
    private experience: number;
    private league: string | undefined;
    private league_icon_urls: any | undefined; 
    private trophies: number;
    private best_trophies: number;
    private versus_trophies: number;
    private best_versus_trophies: number;
    private war_stars: number; 
    private attack_wins: number;
    private defense_wins: number;
    private versus_wins: number;
    private donations: number;
    private received_donations: number;
    private townhall_level: number;
    private builderhall_level: number;
    private clan_name: string | undefined = undefined;
    private clan_tag: string | undefined = undefined;
    private clan_level: number | undefined = undefined;
    private clan_role: string | undefined = undefined;
    private clan_badge_urls: any | undefined = undefined;
    private war_preference: string;
    private achievements: Object[];
    private labels: Object[];
    private heroes: Object[];
    private troops: Object[];
    private spells: Object[];
    
    constructor (api_token: string, resolved_object: any) {
        this.api_token = api_token;
        this.name = resolved_object.name;
        this.tag = resolved_object.tag;
        this.experience = resolved_object.expLevel;
        
        if (resolved_object.hasOwnProperty("league")) {
            this.league = resolved_object.league.name;
            this.league_icon_urls = resolved_object.league.iconUrls;
        }
        
        this.trophies = resolved_object.trophies;
        this.best_trophies = resolved_object.bestTrophies;
        this.versus_trophies = resolved_object.versusTrophies;
        this.best_versus_trophies = resolved_object.bestVersusTrophies;
        this.war_stars = resolved_object.warStars;
        this.attack_wins = resolved_object.attackWins;
        this.defense_wins = resolved_object.defenseWins;
        this.versus_wins = resolved_object.versusBattleWins;
        this.donations = resolved_object.donations;
        this.received_donations = resolved_object.donationsReceived;
        this.townhall_level = resolved_object.townHallLevel;
        this.builderhall_level = resolved_object.builderHallLevel;

        if (resolved_object.hasOwnProperty("clan")) {
            this.clan_name = resolved_object.clan.name;
            this.clan_tag = resolved_object.clan.tag;
            this.clan_level = resolved_object.clan.clanLevel;
            this.clan_role = CLAN_ROLE_NAMES[resolved_object.role];
            this.clan_badge_urls = resolved_object.clan.badgeUrls;
        }
        
        this.war_preference = resolved_object.warPreference;
        this.achievements = resolved_object.achievements;
        this.labels = resolved_object.labels;
        this.heroes = resolved_object.heroes;
        this.troops = resolved_object.troops;
        this.spells = resolved_object.spells;
    }

    getName (): string {
        return this.name;
    }

    getTag (): string {
        return this.tag;
    }

    getExperience (): number {
        return this.experience;
    }

    getLeague (): string | undefined {
        return this.league;
    }

    getLeagueIconURL (size: string): string | undefined {
        if (this.league_icon_urls.hasOwnProperty(size))
            return this.league_icon_urls[size]
        else return undefined;
    }

    getTrophies (): number {
        return this.trophies;
    }

    getBestTrophies (): number {
        return this.best_trophies;
    }

    getVersusTrophies (): number {
        return this.versus_trophies;
    }

    getBestVersusTrophies (): number {
        return this.best_versus_trophies;
    }

    getWarStars (): number {
        return this.war_stars;
    }

    getAttackWins (): number {
        return this.attack_wins;
    }

    getDefenseWins (): number {
        return this.defense_wins;
    }

    getVersusWins (): number {
        return this.versus_wins;
    }

    getDonations (): number {
        return this.donations;
    }

    getReceivedDonations (): number {
        return this.received_donations;
    }

    getTownhallLevel (): number {
        return this.townhall_level;
    }

    getBuilderhallLevel (): number {
        return this.builderhall_level;
    }

    getClanName (): string | undefined {
        return this.clan_name;
    }

    getClanTag (): string | undefined {
        return this.clan_tag;
    }

    getClanLevel (): number | undefined {
        return this.clan_level;
    }

    getClanRole (): string | undefined {
        return this.clan_role;
    }

    getClanBadgeURL (size: string): string | undefined {
        if (this.clan_badge_urls.hasOwnProperty(size))
            return this.clan_badge_urls[size]
        else return undefined;
    }

    getWarPreference (): string {
        return this.war_preference;
    }

    getAchievements (): Object[] {
        let achievements = [];
        
        for (let achievement of this.achievements) achievements.push(new Achievement(achievement));

        return achievements;
    }

    getLabels (): Object[] {
        let labels = [];
        
        for (let label of this.labels) labels.push(new Label(label));

        return labels;
    }

    getHeroes (): Object[] {
        let heroes = [];
        
        for (let hero of this.heroes) heroes.push(new Hero(hero));

        return heroes;
    }

    getTroops (): Object[] {
        let troops = [];
        
        for (let troop of this.troops) troops.push(new Troop(troop));

        return troops;
    }

    getSpells (): Object[] {
        let spells = [];
        
        for (let spell of this.spells) {
            spells.push(new Spell(spell));
        }

        return spells;
    }

    async getClan (): Promise<Object | undefined> {
        let response: any;
        
        if (this.clan_tag != undefined) {
            response = await axios.get(MAIN_ENDPOINT + "/clans/" + escape(this.clan_tag), { headers: { Accept: "application/json", Authorization: `Bearer ${this.api_token}` } });
            return new Clan(this.api_token, response.data);
        } else return undefined;
    }

    toJSON(): Object {
        let achievements = [], 
            labels = [], 
            heroes = [], 
            troops = [], 
            spells = [];

        let achievement: any, 
            label: any, 
            hero: any, 
            troop: any, 
            spell: any;

        for (achievement of this.achievements) {
            achievements.push({
                name: achievement.name,
                stars: achievement.stars,
                current: achievement.value,
                target: achievement.target,
                prompt: achievement.info,
                village: achievement.village
            });
        }
        
        for (label of this.labels) {
            labels.push({
                name: label.name,
                icon_urls: {
                    small: label.iconUrls.small,
                    medium: label.iconUrls.medium
                }
            });
        }
        
        for (hero of this.heroes) {
            heroes.push({
                name: hero.name,
                level: hero.level,
                max_level: hero.maxLevel,
                village: hero.village
            });
        }
        
        for (troop of this.troops) {
            troops.push({
                name: troop.name,
                level: troop.level,
                max_level: troop.maxLevel,
                village: troop.village
            });
        }
        
        for (spell of this.spells) {
            spells.push({
                name: spell.name,
                level: spell.level,
                max_level: spell.maxLevel,
                village: spell.village
            });
        }
        
        let json: any = {
            name: this.name,
            tag: this.tag,
            experience: this.experience,
            trophies: this.trophies,
            best_trophies: this.best_trophies,
            versus_trophies: this.versus_trophies,
            best_versus_trophies: this.best_versus_trophies,
            war_stars: this.war_stars,
            attack_wins: this.attack_wins,
            defense_wins: this.defense_wins,
            versus_wins: this.versus_wins,
            donations: this.donations,
            received_donations: this.received_donations,
            townhall_level: this.townhall_level,
            builderhall_level: this.builderhall_level,
            war_preference: this.war_preference,
            achievements: achievements,
            labels: labels,
            heroes: heroes,
            troops: troops,
            spells: spells
        }

        if (this.league != undefined) {
            json.league = this.league;
            json.league_icon_urls = this.league_icon_urls
        }

        if (this.clan_tag != undefined) {
            json.clan_name = this.clan_name;
            json.clan_tag = this.clan_tag;
            json.clan_level = this.clan_level;
            json.clan_role = this.clan_role;
            json.clan_badge_urls = this.clan_badge_urls;
        }

        return json;
    }
}