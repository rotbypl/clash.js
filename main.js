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

    async #getTokens (cookie) {
        let response;

        response = await axios.post("https://developer.clashofclans.com/api/apikey/list", {  }, { headers: { cookie } });
        // finshing later
    }

    async #createToken (cookie, ip_address) {
        let response;
        
        response = await axios.post("https://developer.clashofclans.com/api/apikey/create", { cidrRanges: [ip_address], name: "clashjs.keys",  description: "key" }, { headers: { cookie } });
        
        if (response.data.status.message != "ok") throw new Error("Trouble processing internal request");
        return { key: response.data.key.key, id: response.data.key.id, name: response.data.key.name };
        
    }

    async #deleteToken (id) {
        
    }
    
    async generateToken (credentials, set = false) {
        let response, generated_token;
        
        if (!(credentials.hasOwnProperty("email") && credentials.hasOwnProperty("password"))) throw new InvalidArgumentError("No credentials have been set");
        
        response = await axios.get("https://api.ipify.org?format=json");
        let ip_address = response.data.ip;
        
        response = await axios.post("https://developer.clashofclans.com/api/login", { email: credentials.email, password: credentials.password }).catch(error => {throw new InvalidArgumentError("Given arguments are not valid")});

        try {
            generated_token = await this.#createToken(response.headers["set-cookie"][0], ip_address);
        } catch (error) {
            if (error.response.data.error != "too-many-keys") throw new Error("Trouble processing"); // Error isn't too many keys something else happened.

            for (token of this.#getTokens(response.headers["set-cookie"][0])) {
                await this.#deleteToken(token.id);
            }
        }

        console.log(generated_token)
        if (set) {
            this.#api_token = generated_token;
        } else {
            return generated_token;
        }
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

    searchClans (search_options) {
        let response = [], parsed_search_options;

        return new Promise(async (resolve, reject) => {
            if (this.#api_token == undefined) reject(new NoTokenError("No token has been set"));
            if (!typeof(search_option) == "object") reject(new InvalidArgumentError("Given argument is not type object"));

            try {
                response = await axios.get(`https://api.clashofclans.com/v1/clans?${parsed_search_options}`, { headers: { Accept: "application/json", Authorization: `Bearer ${this.#api_token}` } });
                resolve(new Player(response.data));
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
