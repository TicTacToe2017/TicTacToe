import Tile from "./tile";
import dbHelper from "../repository/db-helper";

export default class Game {

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

    public move(position: number): Promise<boolean> {
        let promise: Promise<boolean> = new Promise((
            resolve: (value: boolean) => void,
            reject: (value: any) => void
        ) => {
            if (this.tiles[position]) {
                resolve(false);

            } else {
                this.tiles[position] = this.currentPlayer() === this.player_x
                    ? Tile.x
                    : Tile.o;

                dbHelper.updateTiles(this)
                    .then(() => { resolve(true); });
            }
        });

        return promise;
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

        var tileSymbol: string = this.tiles[4];

        if (tileSymbol === Tile.x || tileSymbol === Tile.o) {
            if (this.tiles[3] === tileSymbol && this.tiles[5] === tileSymbol)
                return true;
            if (this.tiles[1] === tileSymbol && this.tiles[7] === tileSymbol)
                return true;
            if (this.tiles[0] === tileSymbol && this.tiles[8] === tileSymbol)
                return true;
            if (this.tiles[2] === tileSymbol && this.tiles[6] === tileSymbol)
                return true;
        }

        tileSymbol = this.tiles[0];

        if (tileSymbol === Tile.x || tileSymbol === Tile.o) {
            if (this.tiles[1] === tileSymbol && this.tiles[2] === tileSymbol)
                return true;
            if (this.tiles[3] === tileSymbol && this.tiles[6] === tileSymbol)
                return true;
        }

        tileSymbol = this.tiles[8];

        if (tileSymbol === Tile.x || tileSymbol === Tile.o) {
            if (this.tiles[7] === tileSymbol && this.tiles[6] === tileSymbol)
                return true;
            if (this.tiles[5] === tileSymbol && this.tiles[2] === tileSymbol)
                return true;
        }

        return false;
    }

    public static fromJson(json): Game {
        const jsonGame = json as Game;
        const game = new Game(jsonGame.player_x, jsonGame.player_o);
        game.tiles = jsonGame.tiles;
        return game;
    }
}