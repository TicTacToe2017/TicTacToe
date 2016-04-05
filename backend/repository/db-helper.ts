import * as mongodb from "mongodb";
import {Promise} from "es6-promise";
import User from "../model/user";
import Game from "../model/game";

export default class DbHelper {

    private static URI: string = "mongodb://localhost/tictactoe";
    private static db: mongodb.Db;

    static init(): Promise<any> {
        return this
            .connect()
            .then(() => {
                console.log("Deleting users data...");
                this.dropAllUsersData();
                console.log("Users data deleted!");
            })
            .then(() => {
                console.log("Creating mock data...");
                this.insertDummyData();
                console.log("Mock data inserted!");
            });
    }

    static connect(): Promise<any> {
        return mongodb.MongoClient
            .connect(this.URI)
            .then((db: mongodb.Db) => {
                this.db = db;
                console.log("Connected to DB!");
            });
    }

    static dropAllUsersData(): Promise<any> {
        return this.db
            .dropCollection("users");
     }

    static insertDummyData(): Promise<any> {
        return this.db
            .collection("users")
            .insertMany([
                new User("Spiderman", 0, 0),
                new User("Batman", 0, 0),
                new User("Daredevil", 0, 0)
            ]);
    }

    static getUsers(): Promise<User[]> {
        return this.db
            .collection("users")
            .find({})
            .toArray();
    }

    static addUser(user: User): Promise<any> {
        return this.db
            .collection("users")
            .insertOne(new User(user.name, 0, 0));
    }

    static getUserByName(name: string): Promise<User> {
        return this.db
            .collection("users")
            .find({ name: name })
            .toArray()
            .then((result: any[]) => {
                return result[0];
            });
    }

    static getGameByPlayerNames(name_player_x: string, name_player_o: string): Promise<Game> {
        return this.db
            .collection("games")
            .find({
                player_x: name_player_x,
                player_o: name_player_o
            })
            .toArray()
            .then((result: any[]) => {
                return Game.fromJson(result[0]);
            });
    }

    static addGame(name_player_x: string, name_player_o: string): Promise<any> {
        return this.db
            .collection("games")
            .insertOne(new Game(name_player_x, name_player_o));
    }

    static getGamesByUserName(name: string): Promise<Game[]> {
        return this.db
            .collection("games")
            .find({ $or: [
                { player_x: name },
                { player_o: name }
             ] })
            .toArray();
    }

    static setGameTile(player_x: string, player_o: string, tileNumber: number, symbol: string): Promise<any> {
        return this.getGameByPlayerNames(player_x, player_o)
            .then((game: Game) => {
                let tiles = game.getTiles();
                tiles[tileNumber] = symbol;
                return tiles;
             })
            .then((tiles: string[]) => {
                this.db
                    .collection("games")
                    .updateOne({ $or: [
                        { player_x: player_x, player_o: player_o },
                        { player_x: player_o, player_o: player_x },
                    ]},
                        {"tiles": tiles}
                    );
            });
    }

}