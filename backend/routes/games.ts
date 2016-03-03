import {Game} from "../model/game";
import {Tile} from "../model/tile";
import {Router} from "express";

const games: Router = Router();

let startedGames: Game[] = [];

/**
 * Creates a new game between two users if there is not already one
 */
games.post("/:name_player_x/:name_player_o", (req, res) => {
    const player_x: string = req.params.name_player_x;
    const player_o: string = req.params.name_player_o;

    if (startedGames.some(g => g.player_x === player_x && g.player_o === player_o)) {
        res.status(403)
            .send("Game already exists");
    } else {
        startedGames.push(new Game(player_x, player_o));
        res.sendStatus(201);
    }
});

/**
 * Get a game's grid between two players
 */
games.get("/:name_player_x/:name_player_o", (req, res) => {
    const player_x: string = req.params.name_player_x;
    const player_o: string = req.params.name_player_o;
    const game: Game = startedGames.filter(g => g.player_x === player_x && g.player_o === player_o)[0];

    if (game) {
        res.status(200)
            .json(game.getTiles());
    } else {
        res.status(404)
            .send("Game does not exists");
    }
});

/**
 * Get all the games for an user
 */
games.get("/:name", (req, res) => {
    const name: string = req.params.name;

    // TODO: check if user exists
    const games: Game[] = startedGames.filter(g => g.player_x === name || g.player_o === name);

    res.send(games);
});

/**
 * Mark a tile by a player
 */
games.put("/:name_player_x/:name_player_o", (req, res) => {
    const player_x: string = req.params.name_player_x;
    const player_o: string = req.params.name_player_o;
    const tileNumber: number = req.query.tile;

    const game: Game = startedGames.filter(g =>
        g.player_x === player_x && g.player_o === player_o
        || g.player_o === player_x && g.player_x === player_o
    )[0];

    if (game) {
        if (game.isUserCurrentPlayer("TODO")) {
            if (game.move(tileNumber)) {
                if (game.isFinished()) {
                    res.status(201)
                        .send("You win!");
                } else {
                    res.sendStatus(201);
                }
            } else {
                res.status(403)
                    .send("Tile is already marked");
            }
        } else {
            res.status(403)
                .send("Wait for your opponent's to move");
        }
    } else {
        res.status(404)
            .send("Game does not exists");
    }
});

export default games;