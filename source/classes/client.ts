import axios from "axios";
import { ClientError } from "./errors"
import { MAIN_ENDPOINT, DEV_ENDPOINT } from "../utils/constants";
import { Player } from "./player";
import { Clan } from "./clan";
import { parseTag } from "../main";

interface ClientOptions {
    api_token?: string
    email?: string
    password?: string
    retry?: boolean
    parse?: boolean
}

export class Client {
    private api_token: string | undefined;
    private email: string | undefined;
    private password: string | undefined;
    private retry: boolean = false;
    private parse: boolean = false;
    
    constructor (client_options?: ClientOptions) {
        if (client_options) {
            this.api_token = client_options.api_token;
            this.email = client_options.email;
            this.password = client_options.password;
            this.retry = (client_options.retry || false);
            this.parse = (client_options.parse || false);
        }
    }

    private async getTokens (cookie: string): Promise<Object> {
        let response: any;

        response = await axios.post(DEV_ENDPOINT + "/apikey/list", {}, { headers: { cookie } });
        
        return response.data.keys;
    }

    private async createToken (cookie: string, ip_address: string): Promise<Object> {
        let response: any;
        
        response = await axios.post(DEV_ENDPOINT + "/apikey/create", { cidrRanges: [ip_address], name: "clash.js.keys",  description: "key" }, { headers: { cookie } });
        if (response.data.status.message != "ok") throw new ClientError("Trouble processing internal request");
        
        return { 
            key: response.data.key.key, 
            id: response.data.key.id, 
            name: response.data.key.name 
        };
    }

    private async deleteToken (cookie: string, token_id: string): Promise<boolean> {
        let response: any;
        
        response = await axios.post(DEV_ENDPOINT + "/apikey/revoke", { id: token_id }, { headers: { cookie } });

        return (response.data.status.message == "ok");
    }

    config (client_options: ClientOptions) {
        if (client_options) {
            this.api_token = client_options.api_token;
            this.email = client_options.email;
            this.password = client_options.password;
            this.retry = (client_options.retry || false);
            this.parse = (client_options.parse || false);
        }
    }

    login (callback?: Function): Promise<void | Function> {
        let response: any, 
            generated_token: any,
            current_tokens: any,
            ip_address: string, 
            cookie: string;
        
        return new Promise(async (resolve, reject) => {
            if ((this.email && this.password) == undefined) reject(new ClientError("Fields email and password have not been configured"));

            response = await axios.get("https://api.ipify.org?format=json");
            ip_address = response.data.ip;
            response = await axios.post(DEV_ENDPOINT + "/login", { email: this.email, password: this.password }).catch(error => { throw new ClientError("Fields email and password are invalid") });
            cookie = response.headers["set-cookie"][0];
            
            try {
                generated_token = await this.createToken(cookie, ip_address);
            } catch (error: any) {
                if (error.response.data.error != "too-many-keys") reject(new ClientError("Trouble processing internal request"));
    
                current_tokens = await this.getTokens(cookie);
                await this.deleteToken(cookie, current_tokens[0].id);
                
                generated_token = await this.createToken(cookie, ip_address);
            }
    
            this.api_token = generated_token.key;
            
            if (callback) resolve(callback()); else resolve();
        });
    }

    getPlayer (tag: string): Promise<any> {
        let response: any

        if (this.parse == true) tag = parseTag(tag);
        
        return new Promise(async (resolve, reject) => {
            if (this.api_token === undefined) reject(new ClientError("API key was not created or provided"));
        
            try {
                response = await axios.get(MAIN_ENDPOINT + "/players/" + escape(tag), { headers: { Accept: "application/json", Authorization: `Bearer ${this.api_token}` } });
                resolve(new Player(this.api_token, response.data));
            } catch (error: any) {                
                switch(error.response.data.reason) {
                    case "notFound":
                        reject(new ClientError("Not found"));
                    case "accessDenied": {
                        if (this.retry && this.email && this.password) {
                            await this.login();
                            this.getPlayer(tag);
                        } else reject(new ClientError("Access denied"));
                    }
                }
            }
        });
    }

    getClan (tag: string): Promise<any> {
        let response: any;

        if (this.parse == true) tag = parseTag(tag);
        
        return new Promise(async (resolve, reject) => {
            if (this.api_token === undefined) reject(new ClientError("API key was not created or provided"));

            try {
                response = await axios.get(MAIN_ENDPOINT + "/clans/" + escape(tag), { headers: { Accept: "application/json", Authorization: `Bearer ${this.api_token}` } });
                resolve(new Clan(this.api_token, response.data));
            } catch (error: any) {
                switch(error.response.data.reason) {
                    case "notFound":
                        reject(new ClientError("Not found"));
                    case "accessDenied": {
                        if (this.retry && this.email && this.password) {
                            await this.login();
                            this.getClan(tag);
                        } else reject(new ClientError("Access denied"));
                    }
                }
            }
        });
    }
}