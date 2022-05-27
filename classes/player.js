const { CLAN_ROLES } = require("../utilities/constants.js");
const { Achievement } = require("./achievement.js");
const { Label } = require("./label.js");
const { Hero } = require("./hero.js");
const { Troop } = require("./troop.js");
const { Spell } = require("./spell.js");
const { ClientError, InvalidAuthorizationError, InvalidArgumentError } = require("./errors.js");

class Player {
    #name;
    #tag;
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
        this.#name = resolved_object.name;
        this.#tag = resolved_object.tag;
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

    getName () {
        return this.#name;
    }

    getTag () {
        return this.#tag;
    }

    getExperience () {
        return this.#experience;
    }

    getLeague () {
        return this.#league;
    }

    getLeagueIconURL (size) {
        if (this.#league_icon_urls.hasOwnProperty(size)) {
            return this.#league_icon_urls[size]
        } else return undefined;
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

    getClanBadgeURL (size) {
        if (this.#clan_badge_urls.hasOwnProperty(size)) {
            return this.#clan_badge_urls[size]
        } else return undefined;
    }

    getWarPreference () {
        return this.#war_preference;
    }

    getAchievements () {
        let achievements = [];
        
        for (let achievement of this.#achievements) {
            achievements.push(new Achievement(achievement));
        }

        return achievements;
    }

    getLabels () {
        let labels = [];
        
        for (let label of this.#labels) {
            labels.push(new Label(label));
        }

        return labels;
    }

    getHeroes () {
        let heroes = [];
        
        for (let hero of this.#heroes) {
            heroes.push(new Hero(hero));
        }

        return heroes;
    }

    getTroops () {
        let troops = [];
        
        for (let troop of this.#troops) {
            troops.push(new Troop(troop));
        }

        return troops;
    }

    getSpells () {
        let spells = [];
        
        for (let spell of this.#spells) {
            spells.push(new Spell(spell));
        }

        return spells;
    }

    toJSON() {
        let achievements = [], 
            labels = [], 
            heroes = [], 
            troops = [], 
            spells = [];

        for (let achievement of this.#achievements) {
            achievements.push({
                name: achievement.name,
                stars: achievement.stars,
                current: achievement.value,
                target: achievement.target,
                prompt: achievement.info,
                village: achievement.village
            });
        }
        
        for (let label of this.#labels) {
            labels.push({
                name: label.name,
                icon_urls: {
                    small: label.iconUrls.small,
                    medium: label.iconUrls.medium
                }
            });
        }
        
        for (let hero of this.#heroes) {
            heroes.push({
                name: hero.name,
                level: hero.level,
                max_level: hero.maxLevel,
                village: hero.village
            });
        }
        
        for (let troop of this.#troops) {
            troops.push({
                name: troop.name,
                level: troop.level,
                max_level: troop.maxLevel,
                village: troop.village
            });
        }
        
        for (let spell of this.#spells) {
            spells.push({
                name: spell.name,
                level: spell.level,
                max_level: spell.maxLevel,
                village: spell.village
            });
        }
        
        return {
            name: this.#name,
            tag: this.#tag,
            experience: this.#experience,
            league: this.#league,
            league_icon_urls: this.#league_icon_urls,
            trophies: this.#trophies,
            best_trophies: this.#best_trophies,
            versus_trophies: this.#versus_trophies,
            best_versus_trophies: this.#best_versus_trophies,
            war_stars: this.#war_stars,
            attack_wins: this.#attack_wins,
            defense_wins: this.#defense_wins,
            versus_wins: this.#versus_wins,
            donations: this.#donations,
            received_donations: this.#received_donations,
            townhall_level: this.#townhall_level,
            builderhall_level: this.#builderhall_level,
            clan_name: this.#clan_name,
            clan_tag: this.#clan_tag,
            clan_level: this.#clan_level,
            clan_role: this.#clan_role,
            clan_badge_urls: this.#clan_badge_urls,
            war_preference: this.#war_preference,
            achievements: achievements,
            labels: labels,
            heroes: heroes,
            troops: troops,
            spells: spells
        }
    }
}

module.exports = { Player };