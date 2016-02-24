export class User {

    name: string;
    played: number;
    winnings: number;

    constructor(name: string, played: number, winnings: number) {
        this.name = name;
        this.played = played;
        this.winnings = winnings;
    }
}