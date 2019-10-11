import { Waiters } from "./entity/Waiters";
import { Shifts } from "./entity/Shifts";

export class WaiterService {
    private connection: any;

    constructor(connection: any) {
        this.connection = connection;
    }

    async addWaiter(firstname: string, lastName: string, password: string) {
        const user = new Waiters();
        user.firstName = firstname;
        user.lastName = lastName;
        user.password = password;
        await this.connection.manager.save(user);
        console.log("Saved a new user with id: " + user.id);
    };

    async loadWeekdays() {
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        for (const day of weekdays) {
            const shifts = new Shifts();
            shifts.weekday = day;
            await this.connection.manager.save(shifts);
        };
    };

    async shiftWaiter(firstName: string, days: Array<string>) {
        const dayList = [];
        let waiterRepository = this.connection.getRepository(Waiters);
        let waiterToUpdate = await waiterRepository.findOne({ firstName: firstName });
        let dayRepository = this.connection.getRepository(Shifts);
        for (const day of days) {
            const inputShift = await dayRepository.findOne({ weekday: day });
            dayList.push(inputShift);
        }
        waiterToUpdate.days = dayList;
        await this.connection.manager.save(waiterToUpdate);
    }

    async displayShiftsForWaiter(firstName: string) {
        const shifts = [];
        const waiter_shifts = await this.connection
            .getRepository(Waiters)
            .findOne({ firstName: firstName }, { relations: ["days"] });
        if (waiter_shifts.days.length > 0) {
            for (const day of waiter_shifts.days) {
                shifts.push(day.weekday);
            }
        }
        return shifts;
    }

    async displayWaitersForShift(day: string) {
        const waiters = [];
        const waiter_shifts = await this.connection
            .getRepository(Shifts)
            .findOne({ weekday: day }, { relations: ["waiters_on_day"] })
        if(waiter_shifts.waiters_on_day.length > 0){
            for(const waiter of waiter_shifts.waiters_on_day){
                waiters.push(waiter.firstName);
            }
        }
        return waiters;
    }
}