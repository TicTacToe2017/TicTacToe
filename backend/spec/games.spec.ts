import ApiClient from "./api-client";
import Game from "../model/game";

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

    it("returns Game already exists if the game already exists", (done) => {
        ApiClient.startGame("Spiderman", "Batman", (err, res) => {
            expect(res).toBeFalsy();
            expect(err).toEqual("Game already exists");
            done();
        });
    });   
});

describe("PUT /games/name_player_x/name_player_o?tile=tile", () => {    
    it("should return Game does not exists if making a movement in an inexisting game", (done) => {
        ApiClient.move("Spiderpig", "Batman", 0, (err, res) => {
            expect(res).toBeFalsy();
            expect(err).toEqual("Game does not exists");
            done();
        });
    });
    
    it("should return a Tile marked status if making a movement in an existing game", (done) => {
        ApiClient.move("Spiderman", "Batman", 0, (err, res) => {
            expect(err).toBeFalsy();
            expect(res).toEqual("Tile marked");
            done();
        });
    });
    
    it("should return a Tile marked status if making a movement in an existing game", (done) => {
        ApiClient.move("Spiderman", "Batman", 3, (err, res) => {
            expect(err).toBeFalsy();
            expect(res).toEqual("Tile marked");
            done();
        });
    });    
    
    it("should return an error if moving in a marked tile", (done) => {
        ApiClient.move("Spiderman", "Batman", 0, (err, res) => {
            expect(res).toBeFalsy();
            expect(err).toEqual("Tile is already marked");
            done();
        });
    });

    it("should return a 200 status if making a movement in an existing game", (done) => {
        ApiClient.move("Spiderman", "Batman", 1, (err, res) => {
            expect(err).toBeFalsy();
            expect(res).toEqual("Tile marked");
            done();
        });
    });

    it("should return a 200 status if making a movement in an existing game", (done) => {
        ApiClient.move("Spiderman", "Batman", 4, (err, res) => {
            expect(err).toBeFalsy();
            expect(res).toEqual("Tile marked");
            done();
        });
    });

    it("should return a victory message if making a winning movement", (done) => {
        ApiClient.move("Spiderman", "Batman", 2, (err, res) => {
            expect(err).toBeFalsy();
            expect(res).toEqual("You win!");
            done();
        });
    });
});
