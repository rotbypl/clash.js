const axios = require("axios");

const { Player } = require("./classes/player.js");
const { Clan } = require ("./classes/clan.js");
const { ClientError, InvalidAuthorizationError, InvalidArgumentError } = require("./classes/errors.js");

class Client {
    #api_token;
    #email;
    #password;
    #auto_renewal;
    
    constructor (api_token) {
        this.#api_token = api_token;
        this.#email;
        this.#password;
        this.#auto_renewal = false;
    }

    async #getTokens (cookie) {
        let response;

        response = await axios.post("https://developer.clashofclans.com/api/apikey/list", {  }, { headers: { cookie } });
        
        return response.data.keys;
    }

    async #createToken (cookie, ip_address) {
        let response;
        
        response = await axios.post("https://developer.clashofclans.com/api/apikey/create", { cidrRanges: [ip_address], name: "clash.js.keys",  description: "key" }, { headers: { cookie } });
        if (response.data.status.message != "ok") throw new ClientError("Trouble processing internal request");
        
        return { key: response.data.key.key, id: response.data.key.id, name: response.data.key.name };
    }

    async #deleteToken (cookie, token_id) {
        let response;
        
        response = await axios.post("https://developer.clashofclans.com/api/apikey/revoke", { id: token_id }, { headers: { cookie } });

        return (response.data.status.message == "ok");
    }

    setToken (api_token) {
        this.#api_token = api_token;
    }
    
    async login (credentials) {
        let response, generated_token, ip_address, cookie;
        
        if (!(credentials.hasOwnProperty("email") && credentials.hasOwnProperty("password"))) throw new InvalidArgumentError("Given arguments are invalid");

        this.#email  = credentials.email;
        this.#password = credentials.password;
        this.#auto_renewal = true;
        
        response = await axios.get("https://api.ipify.org?format=json");
        ip_address = response.data.ip;
        response = await axios.post("https://developer.clashofclans.com/api/login", { email: credentials.email, password: credentials.password }).catch(error => {throw new InvalidArgumentError("Given arguments are not valid")});
        cookie = response.headers["set-cookie"][0];
        
        try {
            generated_token = await this.#createToken(cookie, ip_address);
        } catch (error) {
            if (error.response.data.error != "too-many-keys") throw new ClientError("Trouble processing internal request");

            let tokens = await this.#getTokens(cookie);
            await this.#deleteToken(cookie, tokens[0].id);
            
            generated_token = await this.#createToken(cookie, ip_address);
        }

        this.#api_token = generated_token.key;
    }
    
    getPlayer (player_tag) {
        let response;
        
        return new Promise(async (resolve, reject) => {
            if (this.#api_token == undefined) reject(new ClientError("No token has been set"));
            
            try {
                response = await axios.get(`https://api.clashofclans.com/v1/players/${escape(player_tag)}`, { headers: { Accept: "application/json", Authorization: `Bearer ${this.#api_token}` } });
                resolve(new Player(response.data));
            } catch (error) {
                if (error.response.data.reason == "notFound") {
                    reject(new InvalidArgumentError("Player not found"));
                } else if (error.response.data.reason == "accessDenied") {
                    if (this.#auto_renewal) {
                        console.log("Authorization was invalid, creating new api_token..");

                        try {
                            await this.login({ email: this.#email, password: this.#password });
                            
                            response = await axios.get(`https://api.clashofclans.com/v1/players/${escape(player_tag)}`, { headers: { Accept: "application/json", Authorization: `Bearer ${this.#api_token}` } });
                            resolve(new Player(response.data));
                        } catch (error) {
                            console.error(error.response.data)
                            reject(new ClientError("Trouble processing internal request"));
                        }
                    } else {
                        reject(new InvalidAuthorizationError(error.response.data.message));
                    }
                } else {
                    reject(new ClientError("Trouble processing internal request"));
                }
            }
        });
    }

    getClan (clan_tag) {
        let response;

        return new Promise(async (resolve, reject) => {
            if (this.#api_token == undefined) reject(new ClientError("No token has been set"));
            
            try {
                response = await axios.get(`https://api.clashofclans.com/v1/clans/${escape(clan_tag)}`, { headers: { Accept: "application/json", Authorization: `Bearer ${this.#api_token}` } });
                resolve(new Clan(response.data));
            } catch (error) {
                if (error.response.data.reason == "notFound") {
                    reject(new InvalidArgumentError("Clan not found"));
                } else if (error.response.data.reason == "accessDenied") {
                    if (this.#auto_renewal) {
                        console.log("Authorization was invalid, creating new api_token..");

                        try {
                            await this.login({ email: this.#email, password: this.#password });
                            
                            response = await axios.get(`https://api.clashofclans.com/v1/clans/${escape(clan_tag)}`, { headers: { Accept: "application/json", Authorization: `Bearer ${this.#api_token}` } });
                            resolve(new Player(response.data));
                        } catch (error) {
                            console.error(error.response.data)
                            reject(new ClientError("Trouble processing internal request"));
                        }
                    } else {
                        reject(new InvalidAuthorizationError(error.response.data.message));
                    }
                } else {
                    reject(new ClientError("Trouble processing internal request"));
                }
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

function toJSON (class_object) {
    if (typeof(class_object) == "object" && typeof(class_object.toJSON) == "function") {
        return class_object.toJSON();
    } else return undefined;
}

module.exports = { Client, parseTag, toJSON };
