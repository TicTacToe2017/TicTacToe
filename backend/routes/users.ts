/// <reference path="../model/user.ts" />

import express = require("express");

const users: express.Router = express.Router();

// Dummy data only for testing
const mockedUsersArray: User[] = [
    new User("Spiderman", 0, 0),
    new User("Batman", 0, 0),
    new User("Daredevil", 0, 0)
];

/**
 * Gets all users
 */
users.get("/", (req, res) => {
    res.send(mockedUsersArray);
});

/**
 * Creates a new user
 */
users.post("/", (req, res) => {
    const user: any = req.body;

    mockedUsersArray.forEach(u => {
        if (u === user.name) {
            res.status(403)
                .send("User already exists");
        }
    });

    res.send(201);
});

/**
 * Gets an user stats by name
 */
users.get("/:name", (req, res) => {

    // TODO
    res.send(mockedUsersArray[0]);
});

export default users;