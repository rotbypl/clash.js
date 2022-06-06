import axios from "axios";
import { MAIN_ENDPOINT, CLAN_ROLE_NAMES } from "../utils/constants";
import { Player } from "./player";

export class ClanMember {
    private api_token: string;
    private name: string;
    private tag: string;
    private experience: number;
    private league: string | undefined = undefined;
    private league_icon_urls: any | undefined = undefined;
    private trophies: number;
    private versus_trophies: number;
    private donations: number;
    private received_donations: number;
    private placement: number;
    private previous_placement: number;
    private role: string;
    
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
        this.versus_trophies = resolved_object.versusTrophies;
        this.donations = resolved_object.donations;
        this.received_donations = resolved_object.donationsReceived;
        this.placement = resolved_object.clanRank;
        this.previous_placement = resolved_object.previousClanRank;
        this.role = CLAN_ROLE_NAMES[resolved_object.role];
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

    getLeagueIconURL (size: string) {
        if (this.league_icon_urls?.hasOwnProperty(size))
            return this.league_icon_urls[size];
        else return undefined;
    }

    getTrophies (): number {
        return this.trophies;
    }

    getVersusTrophies (): number {
        return this.versus_trophies;
    }

    getDonations (): number {
        return this.donations;
    }

    getReceivedDonations (): number {
        return this.received_donations;
    }

    getPlacement (): number {
        return this.placement;
    }

    getPreviousPlacement (): number {
        return this.previous_placement;
    }

    getRole (): string {
        return this.role;
    }

    async getPlayer (): Promise<Object> {
        let response: any = await axios.get(MAIN_ENDPOINT + "/players/" + escape(this.tag), { headers: { Accept: "application/json", Authorization: `Bearer ${this.api_token}` } });
        
        return new Player(this.api_token, response.data);
    }
}