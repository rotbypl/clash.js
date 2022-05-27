const { ClientError, InvalidAuthorizationError, InvalidArgumentError } = require("./errors.js");

class WarInfo {
    #league;
    #log_public;
    #frequency;
    #win_streak;
    #wins;
    #ties;
    #losses;
    
    constructor (resolved_object) {
        this.#league = resolved_object.war_league;
        this.#log_public = resolved_object.war_log_public;
        this.#frequency = resolved_object.war_frequency;
        this.#win_streak = resolved_object.war_win_streak;
        this.#wins = resolved_object.war_wins;
        this.#ties = resolved_object.war_ties;
        this.#losses = resolved_object.war_losses;
    }

    getLeague () {
        return this.#league;
    }

    isLogPublic () {
        return this.#log_public;
    }

    getFrequency () {
        return this.#frequency;
    }

    getWinStreak () {
        return this.#win_streak;
    }

    getWins () {
        return this.#wins;
    }

    getTies () {
        return this.#ties;
    }

    getLosses () {
        return this.#losses;
    }

    toJSON () {
        let json = {
            league: this.#league,
            log_public: this.#log_public,
            frequency: this.#frequency,
            win_streak: this.#win_streak,
        }

        if (this.#wins != undefined) { json.wins = this.#wins; }
        if (this.#ties != undefined) { json.ties = this.#ties; }
        if (this.#losses != undefined) { json.losses = this.#losses; }

        return json;
    }
}

module.exports = { WarInfo };