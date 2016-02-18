import express = require("express");

const users: express.Router = express.Router();

/**
 * Gets all users
 */
users.get('/', (req, res) => {
    var usersArray: Array<any> = [
        {
            name: "Spiderman"
        },
        {
            name: "Daredevil"
        },
        {
            name: "Batman"
        }
    ];

    res.send(usersArray);
});

/**
 * Creates a new user
 */
users.post('/', (req, res) => {
    var user = {
        name: "user"
    }

    res.status(201)
        .send(user);
});

/**
 * Gets an user stats by name
 */
users.get("/:name", (req, res) => {
    var user: any = {
        name: "Spiderman",
        winnings: 20,
        played: 20
    }

    res.send(user);
})

export default users;