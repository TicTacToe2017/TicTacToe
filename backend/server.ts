/// <reference path="typings/tsd.d.ts" />

import express = require("express");
import bodyParser = require("body-parser");

let app: express.Express = express();

app.use(bodyParser.json());

import index = require("./routes/index");
import users = require("./routes/users");

app.use("/", index.default);
app.use("/users", users.default);

app.listen(3000, () => {
    console.log("TicTacToe Service listening on port 3000...");
});