import { WaiterService } from "./waiter-service";
const waiterService = new WaiterService();

export default class WaiterManagerAPI {
    index(req, res) {
        res.render('index');
    }
    async displayUsers(req, res) {
        try {
            res.json({
                status: 'success',
                users: await waiterService.users()
            });
        } catch (err) {
            console.log(err.stack);
            res.json({
                status: 'failed',
                error: err.stack
            });
        }
    }
    async addWaiter(req, res) {
        try {
            const details = req.body;
            await waiterService.addWaiter(details.first, details.last, details.pass);
            res.render('success');
        } catch (err) {
            console.log(err.stack);
            res.json({
                status: 'failed',
                error: err.stack
            });
        }
    }
    async shiftWaiter(req, res) {
        try {
            const shifts = req.body;
            console.log(shifts.shifts)
            await waiterService.shiftWaiter(shifts.user, shifts.shifts);
            res.render('success');
        } catch (err) {
            console.log(err.stack);
            res.json({
                status: 'failed',
                error: err.stack
            });
        }
    }
    async displayAllData(req, res) {
        try {
            res.json({
                status: 'success',
                data: await waiterService.displayAllData()
            });
        } catch (err) {
            console.log(err.stack);
            res.json({
                status: 'failed',
                error: err.stack
            });
        }
    };

    async displayShiftsForWaiter(req, res) {
        try {
            const waiter = req.params.user;
            const shifts = await waiterService.displayShiftsForWaiter(waiter);
            res.json({
                status: 'success',
                shifts
            });
        } catch (err) {
            console.log(err.stack);
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
            console.log(err.stack);
            res.json({
                status: 'failed',
                error: err.stack
            });
        }
    }
    // clearWaiterTable() {

    // }
    async loadWeekdays(req, res) {
        try {
            await waiterService.loadWeekdays();
            res.render('success');
        } catch (err) {
            console.log(err.stack);
            res.json({
                status: 'failed',
                error: err.stack
            });
        }
    }

    async clearShifts(req, res) {
        try {
            await waiterService.clearShifts();
            res.render('success');
        } catch (err) {
            console.log(err.stack);
            res.json({
                status: 'failed',
                error: err.stack
            });
        }
    }
    // clearWeekdayTable() {

    // }
} 