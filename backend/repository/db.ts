import * as mongodb from "mongodb";
import {Promise} from "es6-promise";
import User from "../model/user";
import Game from "../model/game";

export default class DB {

    private static server = new mongodb.Server("localhost", 27017);
    private static db = new mongodb.Db("tictactoe", DB.server, { w: 1 });

    static init(): Promise<any> {
        return this.db.open();
    }
}