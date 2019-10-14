import WaiterManagerAPI from "./WaiterManagerAPI";
const waiterManagerAPI = new WaiterManagerAPI();
export default class AppRouting {
    private app: any;

    constructor(app: any) {
        this.app = app;
    }

    routes() {
        this.app.get('/', waiterManagerAPI.index);
        this.app.post('/api/add/waiter', waiterManagerAPI.addWaiter);
        this.app.post('/api/shift/waiter', waiterManagerAPI.shiftWaiter);
        this.app.get('/api/shifts/for/waiter/:user', waiterManagerAPI.displayShiftsForWaiter);
        this.app.get('/api/waiters/for/shift/:day', waiterManagerAPI.displayWaitersForShift);
    }
}