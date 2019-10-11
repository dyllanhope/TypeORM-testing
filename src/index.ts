import "reflect-metadata";
import { createConnection } from "typeorm";
import { Waiters } from "./entity/Waiters";
import { Shifts } from "./entity/Shifts";

createConnection().then(async connection => {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    console.log("Inserting a new user into the database...");

    for (let i = 0; i < 5; i++) {
        const user = new Waiters();
        user.firstName = "Timber" + i;
        user.lastName = "Saw";
        user.password = `${i}23`;
        await connection.manager.save(user);
        console.log("Saved a new user with id: " + user.id);
    };

    for (const day of weekdays){
        const shifts = new Shifts();
        shifts.weekday = day;
        shifts.waiters_on_day = 1;
        await connection.manager.save(shifts);
    };

    console.log("Loading users from the database...");
    const shifts = await connection.manager.find(Shifts);
    const users = await connection.manager.find(Waiters);
    console.log("Loaded users: ", users);
    console.log("Loaded shifts: ", shifts);


    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
