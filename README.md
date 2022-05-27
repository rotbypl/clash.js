<div align="center">
  
  ![Logo](https://developer.clashofclans.com/front-bg-small.d355db.jpg)

  [![Npm](https://img.shields.io/npm/v/clash.js)](https://www.npmjs.com/package/clash.js)
  [![Downloads](https://img.shields.io/npm/dt/clash.js)](https://www.npmjs.com/package/clash.js)

</div>

### About

**clash.js** is a simple [Node.js](https://nodejs.org/en/) module that allows you to easily interact with the [Clash of Clans API](https://developer.clashofclans.com/#/)
  - Object-oriented
  - Predictable abstractions
  - 100% coverage of API (striving for)

### Implementation
Requires [Node.js](https://nodejs.org/en/) version 14.0.0 or newer
```sh-session
npm i clash.js
```
  
### Example
  
```js
const { Client } = require("clash.js");
const client = new Client;

(async () => {
    await client.login({ email: "myemail@gmail.com", password: "****" })
    
    const player = await client.getPlayer("#ABC");
    const player_clan = await client.getClan(player.getClanTag());
    const clan_contents = toJSON(player_clan);

    console.log(clan_contents);
})();
```