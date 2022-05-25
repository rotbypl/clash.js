const axios = require("axios");

const { Player } = require("./classes/player.js");
const { Clan } = require ("./classes/clan.js");
const { NoTokenError, InvalidAuthorizationError, InvalidArgumentError } = require("./classes/errors.js");

class Client {
    #api_token;
    
    constructor (api_token) {
        this.#api_token = api_token;
    }

    setToken (token) {
        this.#api_token = token;
    }

    getPlayer (player_tag) {
        let response;
        
        return new Promise(async (resolve, reject) => {
            if (this.#api_token == undefined) reject(new NoTokenError("No token has been set"));
            
            try {
                response = await axios.get(`https://api.clashofclans.com/v1/players/${escape(player_tag)}`, { headers: { Accept: "application/json", Authorization: `Bearer ${this.#api_token}` } });
                resolve(new Player(response.data));
            } catch (error) {
                reject(new InvalidAuthorizationError(error.response.data.message));
            }
        });
    }

    getClan (clan_tag) {
        let response;

        return new Promise(async (resolve, reject) => {
            if (this.#api_token == undefined) reject(new NoTokenError("No token has been set"));
            
            try {
                response = await axios.get(`https://api.clashofclans.com/v1/clans/${escape(clan_tag)}`, { headers: { Accept: "application/json", Authorization: `Bearer ${this.#api_token}` } });
                resolve(new Clan(response.data));
            } catch (error) {
                reject(new InvalidAuthorizationError(error.response.data.message));
            }
        });
    }
}

function parseTag (tag) {
    let parsed_tag = tag;
    
    if (typeof(tag) != "string") throw new InvalidArgumentError("Given argument is not type string");
    
    if (tag[0] != "#") parsed_tag = `#${tag}`;
    parsed_tag = parsed_tag.toUpperCase();

    return parsed_tag;
}

module.exports = { Client, parseTag };
