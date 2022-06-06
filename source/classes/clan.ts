import axios from "axios";
import { MAIN_ENDPOINT, CLAN_ROLE_NAMES } from "../utils/constants";
import { ClanMember } from "./clan_member";
import { WarInfo } from "./war_info";

export class Clan {
    private api_token: string;
    private name: string;
    private tag: string;
    private description: string;
    private type: string;
    private level: number;
    private member_count: number;
    private members: Object[];
    private badge_urls: any;
    private trophies: number;
    private versus_trophies: number;
    private war_league: string | undefined;
    private war_log_public: boolean;
    private war_frequency: string;
    private war_win_streak: number;
    private war_wins: number;
    private war_ties: number;
    private war_losses: number;
    private required_trophies: number;
    private required_versus_trophies: number;
    private required_townhall: number;
    
    constructor (api_token: string, resolved_object: any) {
        this.api_token = api_token;
        this.name = resolved_object.name;
        this.tag = resolved_object.tag;
        this.description = resolved_object.description;
        this.type = resolved_object.type;
        this.level = resolved_object.clanLevel;
        this.member_count = resolved_object.members;
        
        this.members = resolved_object.memberList;
        
        this.badge_urls = resolved_object.badgeUrls;
        this.trophies = resolved_object.clanPoints;
        this.versus_trophies = resolved_object.clanVersusPoints;

        if (resolved_object.hasOwnProperty("warLeague")) {
            this.war_league = resolved_object.warLeague.name;
        } else this.war_league = undefined;
        
        this.war_frequency = resolved_object.warFrequency;
        this.war_win_streak = resolved_object.warWinStreak;
        this.war_log_public = resolved_object.isWarLogPublic;
        this.war_wins = resolved_object.warWins;
        this.war_ties = resolved_object.warTies;
        this.war_losses = resolved_object.warLosses;
        this.required_trophies = resolved_object.requiredTrophies;
        this.required_versus_trophies = resolved_object.requiredVersusTrophies;
        this.required_townhall = resolved_object.requiredTownhallLevel;
    }

    getName (): string {
        return this.name;
    }

    getTag (): string {
        return this.tag;
    }

    getDescription (): string {
        return this.description;
    }

    getType (): string {
        return this.type;
    }

    getLevel (): number {
        return this.level;
    }

    getMemberCount (): number {
        return this.member_count;
    }

    getMembers (): Object {
        let members = [],
            member: any;

        for (member of this.members) members.push(new ClanMember(this.api_token, member));

        return members;
    }
    
    getBadgeURL (size: string): string | undefined {
        if (this.badge_urls.hasOwnProperty(size)) {
            return this.badge_urls[size]
        } else return undefined;
    }

    getTrophies (): number {
        return this.trophies;
    }

    getVersusTrophies (): number {
        return this.versus_trophies;
    }

    getWarInfo (): Object {
        return new WarInfo({ war_league: this.war_league, war_log_public: this.war_log_public, war_frequency: this.war_frequency, war_win_streak: this.war_win_streak, war_wins: this.war_wins, war_ties: this.war_ties, war_losses: this.war_losses });
    }

    getRequiredTrophies (): number {
        return this.required_trophies;
    }

    getRequiredVersusTrophies (): number {
        return this.required_versus_trophies;
    }

    getRequiredTownhall (): number {
        return this.required_townhall;
    }

    toJSON (): Object {
        let json: any = {
            name: this.name,
            tag: this.tag,
            description: this.description,
            type: this.type,
            level: this.level,
            member_count: this.member_count,
            badge_urls: this.badge_urls,
            trophies: this.trophies,
            versus_trophies: this.versus_trophies,
            war_info: {
                war_league: this.war_league,
                war_log_public: this.war_log_public,
                war_frequency: this.war_frequency,
                war_win_streak: this.war_win_streak,
                war_wins: this.war_wins
            },
            required_trophies: this.required_trophies,
            required_versus_trophies: this.required_versus_trophies,
            required_townhall: this.required_townhall
        }

        if (this.war_ties != undefined) { json.war_info.war_ties = this.war_ties; }
        if (this.war_losses != undefined) { json.war_info.war_losses = this.war_losses; }

        return json;
    }
}