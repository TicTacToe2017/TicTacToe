import {User} from "../model/user";
import {Router} from "express";

const users: Router = Router();

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
    const user = req.body;

    if (!user.name) {
        res.status(403)
            .send("Missing user name");

    } else if (!user.password) {
        res.status(403)
            .send("Missing user password");

    } else if (mockedUsersArray.some((u) => { return u.name === user.name; })) {
        res.status(403)
            .send("User already exists");

    } else {
        mockedUsersArray.push(new User(user.name, 0, 0));
        res.sendStatus(201);
    }
});

/**
 * Gets an user's stats by name
 */
users.get("/:name", (req, res) => {
    const userName: string = req.params.name;
    const user: User = mockedUsersArray.filter((u) => u.name === userName)[0];

    if (user) {
        res.json(user);

    } else {
        res.sendStatus(404);
    }
});

export default users;