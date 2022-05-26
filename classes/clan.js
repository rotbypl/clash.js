const { CLAN_ROLES } = require("../utilities/constants.js");
const { NoTokenError, InvalidAuthorizationError, InvalidArgumentError } = require("./errors.js");

class Clan {
    #clan_name;
    #clan_tag;
    #clan_description;
    #clan_type;
    #clan_level;
    #war_league;
    #war_wins;
    #war_ties;
    #war_losses;
    
    constructor (resolved_object) {
        this.#clan_name = resolved_object.name;
        this.#clan_tag = resolved_object.tag;
        this.#clan_description = resolved_object.description;
        this.#clan_type = resolved_object.type;
        this.#clan_level = resolved_object.clanLevel;
        this.#war_league = resolved_object.warLeague.name;
        this.#war_wins = resolved_object.warWins;
        this.#war_ties = resolved_object.warTies;
        this.#war_losses = resolved_object.warLosses;
    }

    getClanName () {
        return this.#clan_name;
    }

    getClanTag () {
        return this.#clan_tag;
    }

    getClanDescription () {
        return this.#clan_description;
    }

    getClanType () {
        return this.#clan_type;
    }

    getClanLevel () {
        return this.#clan_level;
    }

    getWarLeague () {
        return this.#war_league;
    }

    getWarInfo () {
        return { wins: this.#war_wins, ties: this.#war_ties, losses: this.#war_losses };
    }

    getWarWins () {
        return this.#war_wins;
    }

    getWarTies () {
        return this.#war_ties;
    }

    getWarLosses () {
        return this.#war_losses;
    }
}

module.exports = { Clan };
