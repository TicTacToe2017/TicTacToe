import {Router} from "express";

const index: Router = Router();

index.get("/", (req, res) => {
    res.send("Hello node with TS!");
});

export default index;