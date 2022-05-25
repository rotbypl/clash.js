<div align="center">
  
  ### clash.js
  
  Simple and object oriented wrapper package for the Clash of Clans API
  
  [![Logo](https://img.shields.io/npm/v/clash.js)](https://www.npmjs.com/package/clash.js)

</div>

### Implementation
  
- ```npm i clash.js```
- requires [node.js](https://nodejs.org/en/) v14 or newer
  
### Example
  
```js
const { Client } = require("./clash.js");
const client = new Client(process.env.COC_API_TOKEN);

(async () => {
  const player = await client.getPlayer("#ABC");
  
  console.log(`${player.getPlayerName} (${player.getPlayerTag})`);
})();
```
