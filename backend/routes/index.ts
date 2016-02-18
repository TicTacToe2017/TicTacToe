import express = require("express");

const index: express.Router = express.Router();

index.get('/', (req, res) => {
    res.send("Hello node with TS!");
});

export default index;