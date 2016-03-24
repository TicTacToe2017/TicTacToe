import User from "../model/user";
import {Router} from "express";
import DbHelper from "../repository/db-helper";

const users: Router = Router();

/**
 * Gets all users
 */
users.get("/", (req, res) => {
    DbHelper.getUsers()
        .then((users: User[]) => {
            res.send(users);
        });
});

/**
 * Creates a new user
 */
users.post("/", (req, res) => {
    const user = req.body;

    if (!user.name) {
        res.status(403)
            .send("Missing user name");

    } else if (!user.password) {
        res.status(403)
            .send("Missing user password");

    } else {
        DbHelper
            .getUsers()
            .then((users: User[]) => {
                if (users.some(u => u.name === user.name)) {
                    res.status(403)
                        .send("User already exists");

                } else {
                    DbHelper
                        .addUser(user)
                        .then(() => {
                            res.sendStatus(201);
                        });
                }
            });
    }
});

/**
 * Gets an user's stats by name
 */
users.get("/:name", (req, res) => {
    const userName: string = req.params.name;

    DbHelper
        .getUserByName(userName)
        .then((user: User) => {
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        });
});

export default users;