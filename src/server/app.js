import express from "express";
import bodyParser from "body-parser";
import config from "../config";
import router from "../routes";
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("port", config.app.port);
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.use(router);
export default app;
