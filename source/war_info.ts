export class WarInfo {
    private league: string;
    private log_public: boolean;
    private frequency: string;
    private win_streak: number;
    private wins: number;
    private ties: number | undefined;
    private losses: number | undefined;
    
    constructor (resolved_object: any) {
        this.league = resolved_object.war_league;
        this.log_public = resolved_object.war_log_public;
        this.frequency = resolved_object.war_frequency;
        this.win_streak = resolved_object.war_win_streak;
        this.wins = resolved_object.war_wins;
        this.ties = resolved_object.war_ties;
        this.losses = resolved_object.war_losses;
    }

    getLeague (): string {
        return this.league;
    }

    isLogPublic (): boolean {
        return this.log_public;
    }

    getFrequency (): string {
        return this.frequency;
    }

    getWinStreak (): number {
        return this.win_streak;
    }

    getWins (): number {
        return this.wins;
    }

    getTies (): number | undefined {
        return this.ties;
    }

    getLosses (): number | undefined {
        return this.losses;
    }

    toJSON (): Object {
        let json: any = {
            league: this.league,
            log_public: this.log_public,
            frequency: this.frequency,
            win_streak: this.win_streak,
        }

        if (this.wins != undefined) { json.wins = this.wins; }
        if (this.ties != undefined) { json.ties = this.ties; }
        if (this.losses != undefined) { json.losses = this.losses; }

        return json;
    }
}