import assert from 'assert';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { WaiterService } from "../src/waiter-service";
import { Waiters } from "../src/entity/Waiters";
import { Shifts } from '../src/entity/Shifts';

describe('Waiter shift app with TypeORM service tests', async () => {
    before(async function () {
        await createConnection({
            "type": "postgres",
            // "username": "coder",
            // "password": "pg123",
            "database": "waiter_shifts",
            "synchronize": true,
            "logging": false,
            "entities": [
                "src/entity/**/*.ts"
            ],
        });
        await Waiters.delete({});
        await Shifts.delete({});
    });
    describe('Testing adding new waiters to Database', () => {
        it('Should return that Dyllan is loaded into the waiters Database', async () => {
            const waiterService = new WaiterService();
            await waiterService.clearWeekdayTable();
            await waiterService.clearWaitersTable();
            await waiterService.loadWeekdays();

            await waiterService.addWaiter('Dyllan', 'Hope', '123');

            const results = await Waiters.find();
            assert.equal(results[0].firstName, "Dyllan");
        })
        it('Should return that Dyllan & John were both loaded into the waiters Database', async () => {
            const waiterService = new WaiterService();
            await waiterService.clearWeekdayTable();
            await waiterService.clearWaitersTable();
            await waiterService.loadWeekdays();

            await waiterService.addWaiter('John', 'Hope', '123');
            await waiterService.addWaiter('Mike', 'Dollman', '123');

            const results = await Waiters.find();
            assert.equal(results[0].firstName, "John");
            assert.equal(results[1].firstName, "Mike");
        })
    })
    describe('Testing The shifting of waiters in the Database', () => {
        it('Should return that Vuyo is shifted for Monday, Thursday & Saturday', async () => {
            const waiterService = new WaiterService();
            await waiterService.clearWeekdayTable();
            await waiterService.clearWaitersTable();
            await waiterService.loadWeekdays();

            await waiterService.addWaiter('Vuyo', 'Matu', '123');

            await waiterService.shiftWaiter('Vuyo', ['Monday', 'Thursday', 'Saturday']);
            assert.deepEqual(await waiterService.displayShiftsForWaiter("Vuyo"), ['Monday', 'Thursday', 'Saturday']);
        })
        it('Should return that John & Dyllan are both shifted for Monday', async () => {
            const waiterService = new WaiterService();
            await waiterService.clearWeekdayTable();
            await waiterService.clearWaitersTable();
            await waiterService.loadWeekdays();

            await waiterService.addWaiter('Dyllan', 'Hope', '123');
            await waiterService.addWaiter('John', 'Hope', '123');

            await waiterService.shiftWaiter('John', ['Monday', 'Thursday', 'Saturday']);
            await waiterService.shiftWaiter('Dyllan', ['Monday', 'Wednesday', 'Friday']);
            assert.deepEqual(await waiterService.displayWaitersForShift("Monday"), ['John', 'Dyllan']);
        })
    })
});