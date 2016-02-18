/// <reference path="typings/tsd.d.ts" />

import express = require("express");
import bodyParser = require("body-parser");

var app: express.Express = express();

app.use(bodyParser.json());

import index = require("./routes/index");

app.use("/", index.default);

app.listen(3000, () => {
    console.log("TicTacToe Service listening on port 3000...");
})