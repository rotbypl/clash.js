const { CLAN_ROLES } = require("../utilities/constants.js");

class Player {
    #player_name;
    #player_tag;
    #experience;
    #league;
    #league_icon_urls; 
    #trophies;
    #best_trophies;
    #versus_trophies;
    #best_versus_trophies;
    #war_stars; 
    #attack_wins;
    #defense_wins;
    #versus_wins;
    #donations;
    #received_donations;
    #townhall_level;
    #builderhall_level;
    #clan_name;
    #clan_tag;
    #clan_level;
    #clan_role;
    #clan_badge_urls;
    #war_preference;
    #achievements;
    #labels;
    #heroes;
    #troops;
    #spells;
    
    constructor (resolved_object) {
        this.#player_name = resolved_object.name;
        this.#player_tag = resolved_object.tag;
        this.#experience = resolved_object.expLevel;
        this.#league = resolved_object.league.name;
        this.#league_icon_urls = resolved_object.league.iconUrls;
        this.#trophies = resolved_object.trophies;
        this.#best_trophies = resolved_object.bestTrophies;
        this.#versus_trophies = resolved_object.versusTrophies;
        this.#best_versus_trophies = resolved_object.bestVersusTrophies;
        this.#war_stars = resolved_object.warStars;
        this.#attack_wins = resolved_object.attackWins;
        this.#defense_wins = resolved_object.defenseWins;
        this.#versus_wins = resolved_object.versusBattleWins;
        this.#donations = resolved_object.donations;
        this.#received_donations = resolved_object.donationsReceived;
        this.#townhall_level = resolved_object.townHallLevel;
        this.#builderhall_level = resolved_object.builderHallLevel;
        this.#clan_name = resolved_object.clan.name;
        this.#clan_tag = resolved_object.clan.tag;
        this.#clan_level = resolved_object.clan.clanLevel;
        this.#clan_role = CLAN_ROLES[resolved_object.role];
        this.#clan_badge_urls = resolved_object.clan.badgeUrls;
        this.#war_preference = resolved_object.warPreference;
        this.#achievements = resolved_object.achievements;
        this.#labels = resolved_object.labels;
        this.#heroes = resolved_object.heroes;
        this.#troops = resolved_object.troops;
        this.#spells = resolved_object.spells;
    }

    getPlayerName () {
        return this.#player_name;
    }

    getPlayerTag () {
        return this.#player_tag;
    }

    getExperience () {
        return this.#experience;
    }

    getLeague () {
        return this.#league;
    }

    getLeagueIconUrl (size) {
        if (this.#league_icon_urls[size]) {
            return this.#league_icon_urls[size]
        } else {
            throw new InvalidArgumentError(size + " not a valid argument")
        }
    }

    getTrophies () {
        return this.#trophies;
    }

    getBestTrophies () {
        return this.#best_trophies;
    }

    getVersusTrophies () {
        return this.#versus_trophies;
    }

    getBestVersusTrophies () {
        return this.#best_versus_trophies;
    }

    getWarStars () {
        return this.#war_stars;
    }

    getAttackWins () {
        return this.#attack_wins;
    }

    getDefenseWins () {
        return this.#defense_wins;
    }

    getVersusWins () {
        return this.#versus_wins;
    }

    getDonations () {
        return this.#donations;
    }

    getReceivedDonations () {
        return this.#received_donations;
    }

    getTownhallLevel () {
        return this.#townhall_level;
    }

    getBuilderhallLevel () {
        return this.#builderhall_level;
    }

    getClanName () {
        return this.#clan_name;
    }

    getClanTag () {
        return this.#clan_tag;
    }

    getClanLevel () {
        return this.#clan_level;
    }

    getClanRole () {
        return this.#clan_role;
    }

    getClanBadgeUrl (size) {
        if (this.#clan_badge_urls[size]) {
            return this.#clan_badge_urls[size]
        } else {
            throw new InvalidArgumentError(size + " not a valid argument");
        }
    }

    getWarPreference () {
        return this.#war_preference;
    }

    getAchievements () {
        let achievements = [];
        
        for (achievement in this.#achievements) {
            achievements.push({
                name: achievement.name,
                stars: achievement.stars,
                current: achievement.value,
                target: achievement.target,
                prompt: achievement.info,
                village: achievement.village
            });
        }

        return achievements;
    }

    getLabels () {
        let labels = [];
        
        for (label in this.#labels) {
            labels.push({
                name: label.name,
                icon_urls: {
                    small: label.iconUrls.small,
                    medium: label.iconUrls.medium
                }
            });
        }

        return labels;
    }

    getHeroes () {
        let heroes = [];
        
        for (hero in this.#heroes) {
            heroes.push({
                name: hero.name,
                level: hero.level,
                max_level: hero.maxLevel,
                village: hero.village
            });
        }

        return heroes;
    }

    getTroops () {
        let troops = [];
        
        for (troop in this.#troops) {
            troops.push({
                name: troop.name,
                level: troop.level,
                max_level: troop.maxLevel,
                village: troop.village
            });
        }

        return troops;
    }

    getSpells () {
        let spells = [];
        
        for (spell in this.#spells) {
            spells.push({
                name: spell.name,
                level: spell.level,
                max_level: spell.maxLevel,
                village: spell.village
            });
        }

        return spells;
    }
}

module.exports = { Player };
