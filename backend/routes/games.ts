import Game from "../model/game";
import Tile from "../model/tile";
import {Router} from "express";
import DbHelper from "../repository/db-helper";

const games: Router = Router();

/**
 * Creates a new game between two users if there is not already one
 */
games.post("/:name_player_x/:name_player_o", (req, res) => {
    const name_player_x: string = req.params.name_player_x;
    const name_player_o: string = req.params.name_player_o;

    DbHelper
        .getGameByPlayerNames(name_player_x, name_player_o)
        .then((game: Game) => {
            if (game) {
                res.status(403)
                    .send("Game already exists");
            } else {
                DbHelper
                    .addGame(name_player_x, name_player_o)
                    .then(() => {
                        res.sendStatus(201);
                    });
            }
        });
});

/**
 * Get a game's grid between two players
 */
games.get("/:name_player_x/:name_player_o", (req, res) => {
    const name_player_x: string = req.params.name_player_x;
    const name_player_o: string = req.params.name_player_o;
    DbHelper
        .getGameByPlayerNames(name_player_x, name_player_o)
        .then((game: Game) => {
            if (game) {
                res.status(200)
                    .json(game);
            } else {
                res.status(404)
                    .send("Game does not exists");
            }
        });
});

/**
 * Get all the games for an user
 */
games.get("/:name", (req, res) => {
    const name: string = req.params.name;

    DbHelper
        .getGamesByUserName(name)
        .then((games: Game[]) => {
            if (games) {
                res.send(games);
            } else {
                res.status(404)
                    .send("User does not exists");
            }
        });
});

/**
 * Mark a tile by a player
 */
games.put("/:name_player_x/:name_player_o", (req, res) => {
    const name_player_x: string = req.params.name_player_x;
    const name_player_o: string = req.params.name_player_o;
    const tileIndex: number = req.query.tile;

    // TODO: is this validation good placed?
    if (tileIndex > 8 || tileIndex < 0) {
        res.status(404)
            .send("Tile index must be between 0 and 8");
    }
    
    DbHelper
        .getGameByPlayerNames(name_player_x, name_player_o)
        .then((game: Game) => {
            if (game) {
                game.move(tileIndex)
                    .then((result: any) =>
                        res.status(result.status)
                            .send(result.message)
                    );
            } else {
                res.status(404)
                    .send("Game does not exists");
            }
        });
});

export default games;