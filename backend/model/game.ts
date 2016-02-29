import {Tile} from "./tile";

export class Game {

    player_x: string;
    player_o: string;
    private tiles: string[];

    constructor(player_x: string, player_o: string) {
        this.player_x = player_x;
        this.player_o = player_o;
        this.tiles = new Array(9);
    }

    public getTiles(): string[] {
        return this.tiles;
    }

    public move(position: number): boolean {
        // TODO: check if number is within range 0-8
        if (this.tiles[position]) {
            return false;

        } else {
            this.tiles[position] = this.currentPlayer() === this.player_x
                ? Tile.x
                : Tile.o;

            return true;
        }
    }

    public currentPlayer(): string {
        const movementCount: number = this.tiles
            .filter(t => t !== undefined)
            .length;

        return movementCount % 2
            ? this.player_o
            : this.player_x;
    }

    public isUserCurrentPlayer(name: string): boolean {
        // TODO: check if requesting user is actually the current player
        // return name === this.currentPlayer();

        return true;
    }

    public isFinished(): boolean {
        // TODO: check if any player has marked 3 tiles in line
        return false;
    }
}