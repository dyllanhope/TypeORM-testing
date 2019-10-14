import express from "express";
import bodyParser from "body-parser";
import AppRouting from "./AppRouting";
import "reflect-metadata";
import { createConnection } from "typeorm";

const app = express();
const appRouting = new AppRouting(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

createConnection().then(async connection => {
    appRouting.routes();
}).catch(error => console.log(error));


var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('App started on port:', PORT);
});
