import { WaiterService } from "./waiter-service";
const waiterService = new WaiterService;
export default class WaiterManagerAPI {
    index(req, res) {
        res.send('hey dude.')
    }
    async addWaiter(req, res) {
        try {
            const details = req.body;
            console.log(details);
            await waiterService.addWaiter(details.first, details.last, details.pass);
            res.json({
                status: 'success'
            });
        } catch (err) {
            res.json({
                status: 'failed',
                error: err.stack
            });
        }
    }
    async shiftWaiter(req, res) {
        try {
            const shifts = req.body;
            await waiterService.shiftWaiter(shifts.user, shifts.shifts);
            res.json({
                status: 'success'
            });
        } catch (err) {
            res.json({
                status: 'failed',
                error: err.stack
            });
        }
    }
    async displayShiftsForWaiter(req, res) {
        try {
            const waiter = req.params.user;
            const shifts = await waiterService.displayShiftsForWaiter(waiter);
            res.json({
                status: 'success',
                shifts
            });
        } catch (err) {
            res.json({
                status: 'failed',
                error: err.stack
            });
        }
    }
    async displayWaitersForShift(req, res) {
        try {
            const day = req.params.day
            const waiters = await waiterService.displayWaitersForShift(day);
            res.json({
                status: 'success',
                waiters
            });
        } catch (err) {
            res.json({
                status: 'failed',
                error: err.stack
            });
        }
    }
    // clearWaiterTable() {

    // }
    // loadWeekdays() {

    // }
    // clearWeekdayTable() {

    // }
} 