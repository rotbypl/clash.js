# 1.0.9

Version 1.0.9 is the first **stable** build of the **clash.js** module

**Client**

- `Client(?api_token: string)` class
- `setToken(*api_token)` `Client` member function returns `void`
- `login(*{ email: string, password: string })` `Client` member function returns `void`
- `getPlayer()` `Client` member function returns `Class Player`
- `getClan()` `Client` member function returns `Class Clan`

**Player**

- `Player` class
- `getName()` `Player` member function returns `name: string`
- `getTag()` `Player` member function returns `tag: string`
- `getExperience()` `Player` member function returns `experience: int`
- `getLeague()` `Player` member function returns `league: string`
- `getLeagueIconURL(*size: string)` `Player` member function returns `league_icon_urls[size]: string`
- `getTrophies()` `Player` member function returns `trophies: int`
- `getBestTrophies()` `Player` member fuction returns `best_trophies: int`
- `getVersusTrophies()` `Player` member function returns `versus_trophies: int`
- `getBestVersusTrophies()` `Player` member function returns `best_versus_trophies: int`
- `getWarStars()` `Player` member function returns `war_stars: int`
- `getAttackWins()` `Player` member function returns `attack_wins: int`
- `getDefenseWins()` `Player` member function returns `defense_wins: int`
- `getVersusWins()` `Player` member function returns `versus_wins: int`
- `getDonations()` `Player` member function returns `donations: int`
- `getReceivedDonations()` `Player` member function returns `received_donations: int`
- `getTownhallLevel()` `Player` member function returns `townhall_level: int`
- `getBuilderhallLevel()` `Player` member function returns `builderhall_level: int`
- `getClanName()` `Player` member function returns `clan_name: string`
- `getClanTag()` `Player` member function returns `clan_tag: string`
- `getClanLevel()` `Player` member function returns `clan_level: int`
- `getClanRole()` `Player` member function returns `clan_role: string`
- `getClanBadgeURL(*size: string)` `Player` member function returns `clan_badge_url: string`
- `getWarPreference()` `Player` member function returns `war_preference: string`
- `getAchievements()` `Player` member function returns `Object: Class Achievement`
- `getLabels()` `Player` member function returns `Object: Class Label`
- `getHeroes()` `Player` member function returns `Object: Class Hero`
- `getTroops()` `Player` member function returns `Object: Class Troop`
- `getSpells()` `Player` member function returns `Object: Class Spell`
- `toJSON()` `Player` member function returns `Object`

**Clan**

- `Clan` class
- `getName()` `Clan` member function returns `name: string`
- `getTag()` `Clan` member function returns `tag: string`
- `getDescription()` `Clan` member function returns `description: string`
- `getType()` `Clan` member function returns `type: string`
- `getLevel()` `Clan` member function returns `level: int`
- `getMembers()` `Clan` member function returns `members: int`
- `getBadgeURL(*size: string)` `Clan` member function returns `badge_urls[size]: string`
- `getTrophies()` `Clan` member function returns `trophies: int`
- `getVersusTrophies()` `Clan` member function returns `versus_trophies: int`
- `getWarInfo()` `Clan` member function returns `Class WarInfo`
- `getRequiredTrophies()` `Clan` member function returns `required_trophies: int`
- `getRequiredVersusTrophies()` `Clan` member function returns `required_versus_trophies: int`
- `getRequiredTownhall()` `Clan` member function returns `required_townhall: int`
- `toJSON()` `Clan` member function returns `Object`

**WarInfo**

- `WarInfo(*Object)` class
- `getLeague()` `WarInfo` member function returns `league: string`
- `isLogPublic()` `WarInfo` member function returns `boolean`
- `getFrequency()` `WarInfo` member function returns `frequency: string`
- `getWinStreak()` `WarInfo` member function returns `win_streak: int`
- `getWins()` `WarInfo` member function returns `wins: int`
- `getTies()` `WarInfo` member function returns `ties: int`
- `getLosses()` `WarInfo` member function returns `losses: int`
- `toJSON()` `WarInfo` member function returns `Object`

**Achievement**

- `Achievement(*resolved_object: Object)` class
- `getName()` `Achievement` member function returns `name: string`
- `getStars()` `Achievement` member function returns `stars: int`
- `getCurrent()` `Achievement` member function returns `current: int`
- `getTarget()` `Achievement` member function returns `target: int`
- `getPrompt()` `Achievement` member function returns `prompt: string`
- `getVillage()` `Achievement` member function returns `village: string`
- `isFinished()` `Achievement` member function returns `boolean`
- `toJSON()` `Achievement` member function returns `Object`

**Label**

- `Label(*resolved_object: Object)` class
- `getName()` `Label` member function returns `name: string`
- `getIconURL(*size: string)` `Label` member function returns `icon_urls[size]: string`
- `toJSON()` `Label` member function returns `Object`

**Hero**

- `Hero(*resolved_object: Object)` class
- `getName()` `Hero` member function returns `name: string`
- `getLevel()` `Hero` member function returns `level: int`
- `getMaxLevel()` `Hero` member function returns `max_level: int`
- `getVillage()` `Hero` member function returns `village: string`
- `isHomeBase()` `Hero` member function returns `boolean`
- `isBuilderBase()` `Hero` member function returns `boolean`
- `isMaxLevel()` `Hero` member function returns `boolean`
- `toJSON()` `Hero` member function returns `Object`

**Troop**

- `Troop(*resolved_object: Object)` class
- `getName()` `Troop` member function returns `name: string`
- `getLevel()` `Troop` member function returns `level: int`
- `getMaxLevel()` `Troop` member function returns `max_level: int`
- `getVillage()` `Troop` member function returns `village: string`
- `isHomeBase()` `Troop` member function returns `boolean`
- `isBuilderBase()` `Troop` member function returns `boolean`
- `isMaxLevel()` `Troop` member function returns `boolean`
- `toJSON()` `Troop` member function returns `Object`

**Spell**

- `Spell(*resolved_object: Object)` class
- `getName()` `Spell` member function returns `name: string`
- `getLevel()` `Spell` member function returns `level: int`
- `getMaxLevel()` `Spell` member function returns `max_level: int`
- `getVillage()` `Spell` member function returns `village: string`
- `isHomeBase()` `Spell` member function returns `boolean`
- `isBuilderBase()` `Spell` member function returns `boolean`
- `isMaxLevel()` `Spell` member function returns `boolean`
- `toJSON()` `Spell` member function returns `Object`

**Methods**

- `parseTag(*tag)` method returns `parsed_tag: string`
- `toJSON(*class_object)` method returns `Object`