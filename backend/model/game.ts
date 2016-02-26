import {Tile} from "./tile";

export class Game {

    player_x: string;
    player_o: string;
    tiles: Tile[];

    constructor(player_x: string, player_o: string) {
        this.player_x = player_x;
        this.player_o = player_o;
        this.tiles = [];
    }
}