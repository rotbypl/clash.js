const { CLAN_ROLES } = require("../utilities/constants.js");
const { WarInfo } = require("./war_info.js");

class Clan {
    #name;
    #tag;
    #description;
    #type;
    #level;
    #members;
    #badge_urls;
    #trophies;
    #versus_trophies;
    #war_league;
    #war_log_public;
    #war_frequency;
    #war_win_streak;
    #war_wins;
    #war_ties;
    #war_losses;
    #required_trophies;
    #required_versus_trophies;
    #required_townhall;
    
    constructor (resolved_object) {
        this.#name = resolved_object.name;
        this.#tag = resolved_object.tag;
        this.#description = resolved_object.description;
        this.#type = resolved_object.type;
        this.#level = resolved_object.clanLevel;
        this.#members = resolved_object.members;
        this.#badge_urls = resolved_object.badgeUrls;
        this.#trophies = resolved_object.clanPoints;
        this.#versus_trophies = resolved_object.clanVersusPoints;
        this.#war_league = resolved_object.warLeague.name;
        this.#war_frequency = resolved_object.warFrequency;
        this.#war_win_streak = resolved_object.warWinStreak;
        this.#war_log_public = resolved_object.isWarLogPublic;
        this.#war_wins = resolved_object.warWins;
        this.#war_ties = resolved_object.warTies;
        this.#war_losses = resolved_object.warLosses;
        this.#required_trophies = resolved_object.requiredTrophies;
        this.#required_versus_trophies = resolved_object.requiredVersusTrophies;
        this.#required_townhall = resolved_object.requiredTownhallLevel;
    }

    getName () {
        return this.#name;
    }

    getTag () {
        return this.#tag;
    }

    getDescription () {
        return this.#description;
    }

    getType () {
        return this.#type;
    }

    getLevel () {
        return this.#level;
    }

    getMembers () {
        return this.#members;
    }

    getBadgeURL (size) {
        if (this.#badge_urls.hasOwnProperty(size)) {
            return this.#badge_urls[size]
        } else return undefined;
    }

    getTrophies () {
        return this.#trophies;
    }

    getVersusTrophies () {
        return this.#versus_trophies;
    }

    getWarInfo () {
        return new WarInfo({ war_league: this.#war_league, war_log_public: this.#war_log_public, war_frequency: this.#war_frequency, war_win_streak: this.#war_win_streak, war_wins: this.#war_wins, war_ties: this.#war_ties, war_losses: this.#war_losses });
    }

    getRequiredTrophies () {
        return this.#required_trophies;
    }

    getRequiredVersusTrophies () {
        return this.#required_versus_trophies;
    }

    getRequiredTownhall () {
        return this.#required_townhall;
    }

    toJSON () {
        let json = {
            name: this.#name,
            tag: this.#tag,
            description: this.#description,
            type: this.#type,
            level: this.#level,
            badge_urls: this.#badge_urls,
            trophies: this.#trophies,
            versus_trophies: this.#versus_trophies,
            war_info: {
                war_league: this.#war_league,
                war_log_public: this.#war_log_public,
                war_frequency: this.#war_frequency,
                war_win_streak: this.#war_win_streak,
            },
            required_trophies: this.#required_trophies,
            required_versus_trophies: this.#required_versus_trophies,
            required_townhall: this.#required_townhall
        }

        if (this.#war_wins != undefined) { json.war_info.war_wins = this.#war_wins; }
        if (this.#war_ties != undefined) { json.war_info.war_ties = this.#war_ties; }
        if (this.#war_losses != undefined) { json.war_info.war_losses = this.#war_losses; }

        return json;
    }
}

module.exports = { Clan };