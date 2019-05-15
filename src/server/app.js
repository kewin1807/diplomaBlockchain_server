import express from "express";
import bodyParser from "body-parser";
import config from "../config";
import router from "../routes";
var cors = require("cors");

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.set("port", config.app.port);
app.get("/", (req, res) => res.send("Hello World"));

app.use(router);
export default app;
