import express from "express";
import bodyParser from "body-parser";

import "reflect-metadata";
import { createConnection } from "typeorm";
import { WaiterService } from "./waiter-service";
import { resolve } from "dns";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('hey dude.')
});


var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('App started on port:', PORT);
});
// createConnection().then(async connection => {

// }).catch(error => console.log(error));
