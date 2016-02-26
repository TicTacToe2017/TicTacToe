import {Game} from "../model/game";
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

export default games;