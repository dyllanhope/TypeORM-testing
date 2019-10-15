import express from "express";
import bodyParser from "body-parser";
import AppRouting from "./AppRouting";
import "reflect-metadata";
import { createConnection } from "typeorm";
import exphbs from "express-handlebars";

const app = express();
const handlebarSetup = exphbs({
    partialsDir: './views',
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const appRouting = new AppRouting(app);


createConnection().then(async connection => {
    appRouting.routes();
}).catch(error => console.log(error));


var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('App started on port:', PORT);
});
