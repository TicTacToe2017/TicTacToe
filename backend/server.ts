/// <reference path="typings/tsd.d.ts" />

import express = require("express");
import bodyParser = require("body-parser");

let app: express.Express = express();

app.use(bodyParser.json());

import index from "./routes/index";
import users from "./routes/users";

app.use("/", index);
app.use("/users", users);

app.listen(3000, () => {
    console.log("TicTacToe Service listening on port 3000...");
});