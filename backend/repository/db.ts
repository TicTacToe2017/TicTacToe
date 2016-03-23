import * as mongodb from "mongodb";
import {Promise} from "es6-promise";
import User from "../model/user";
import Game from "../model/game";

export default class DB {

    private static URI: string = "mongodb://localhost/tictactoe";
    private static DB: mongodb.Db;

    // private static server = new mongodb.Server("localhost", 27017);
    // private static db = new mongodb.Db("tictactoe", DB.server, { w: 1 });

    static init(): Promise<any> {
        return this
            .connect()
            .then(() => {
                return this.insertDummyData();
            });
    }

    static connect(): Promise<any> {
        return mongodb.MongoClient
            .connect(this.URI)
            .then((DB: mongodb.Db) => {
                this.DB = DB;
            });
    }

    static insertDummyData(): Promise<any> {
        return this.DB
            .collection("users")
            .insertMany([
                new User("Spiderman", 0, 0),
                new User("Batman", 0, 0),
                new User("Daredevil", 0, 0)
            ]);
    }

    static getUsers(): Promise<User[]> {
        return this.DB
            .collection("users")
            .find({})
            .toArray();
    }
}