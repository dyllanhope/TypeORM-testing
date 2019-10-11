import "reflect-metadata";
import { createConnection } from "typeorm";
import { WaiterService } from "./waiter-service";

createConnection().then(async connection => {
    const waiterService = new WaiterService(connection);

    console.log("Loading waiters into Database");
    await waiterService.addWaiter('Dyllan', 'Hope', '123');
    await waiterService.addWaiter('John', 'Hope', '123');
    await waiterService.addWaiter('Siri', 'Apple', '123');
    await waiterService.addWaiter('Vuyo', 'Matu', '123');
    console.log('---------------------------------');
    console.log("Loading weekdays into Database")
    await waiterService.loadWeekdays();
    console.log('---------------------------------');
    console.log("Shifting all the loaded waiters");
    await waiterService.shiftWaiter("Dyllan",["Monday","Tuesday","Friday"]);
    await waiterService.shiftWaiter("John",["Monday","Wednesday","Friday"]);
    await waiterService.shiftWaiter("Siri",["Monday","Thursday","Saturday"]);
    await waiterService.shiftWaiter("Vuyo",["Wednesday","Thursday","Sunday"]);
    console.log('---------------------------------');

    console.log("Dyllan's shifts: ",await waiterService.displayShiftsForWaiter("Dyllan"));
    console.log("Wednesday's waiters: ",await waiterService.displayWaitersForShift("Wednesday"));

}).catch(error => console.log(error));
