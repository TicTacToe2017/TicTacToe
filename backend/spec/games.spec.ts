import {ApiClient} from "./api-client";
import {Game} from "../model/game";

describe("GET /games/name", () => {
    it("lists all games which an user plays in", (done) => {
        ApiClient.getGamesForUser("Spiderman", (err, games: Game[]) => {
            expect(err).toBeFalsy();
            expect(games.length).toBe(0);
            done();
        });
    });
});

describe("GET /games/name_player_x/name_player_o", () => {
    it("creates a new game between two players if only it has not been created already", (done) => {
        ApiClient.startGame("Spiderman", "Batman", (err, res) => {
            expect(err).toBeFalsy();
            expect(res).toEqual("Created");
            done();
        });
    });

    it("returns code 403 as error if the game already exists", (done) => {
        ApiClient.startGame("Spiderman", "Batman", (err, res) => {
            expect(err).toBeTruthy();
            expect(err).toEqual("Game already exists");
            done();
        });
    });
});