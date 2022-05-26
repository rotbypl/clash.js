<div align="center">
  
  ![Logo](https://developer.clashofclans.com/front-bg-small.d355db.jpg)
  
  **clash.js** is a simple [Node.js](https://nodejs.org/en/) object oriented wrapper package for the [Clash of Clans API](https://developer.clashofclans.com/#/)
  
  [![Npm](https://img.shields.io/npm/v/clash.js)](https://www.npmjs.com/package/clash.js)
  [![Discord](https://img.shields.io/discord/979167440711876609?color=%235865f2)](https://discord.gg/GrnUqrtvJN)

</div>

**Implementation**
  
- ```npm i clash.js```
- requires [Node.js](https://nodejs.org/en/) version 14.0.0 or newer
  
**Example**
  
```js
const { Client } = require("./clash.js");
const client = new Client(process.env.COC_API_TOKEN);

(async () => {
  const player = await client.getPlayer("#ABC");
  
  console.log(`${player.getPlayerName} (${player.getPlayerTag})`);
})();
```
