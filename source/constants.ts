export const MAIN_ENDPOINT: string = "https://api.clashofclans.com/v1" as const;

export const DEV_ENDPOINT: string = "https://developer.clashofclans.com/api" as const;

export const CLAN_ROLE_NAMES: any = {
    "leader": "Leader",
    "coLeader": "Co-leader",
    "admin": "Elder",
    "member": "Member",
    "not_member": "Clanless"
} as const;

export const BASE_NAMES: any = {
    "home": "home",
    "builderBase": "builder"
} as const;