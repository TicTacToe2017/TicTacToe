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
}