import { Waiters } from "./entity/Waiters";
import { Shifts } from "./entity/Shifts";

export class WaiterService {

    async addWaiter(firstname: string, lastName: string, password: string) {
        const user = new Waiters();
        user.firstName = firstname;
        user.lastName = lastName;
        user.password = password;
        await Waiters.save(user);
    };

    async loadWeekdays() {
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        for (const day of weekdays) {
            const shifts = new Shifts();
            shifts.weekday = day;
            await Shifts.save(shifts);
        };
    };

    async shiftWaiter(firstName: string, days: Array<string>) {
        const dayList = [];
        let waiterToUpdate = await Waiters.findOne({ firstName: firstName });
        for (const day of days) {
            console.log(day)
            const inputShift = await Shifts.findOne({ weekday: day });
            dayList.push(inputShift);
        }
        waiterToUpdate.days = dayList;
        await Waiters.save(waiterToUpdate);
    }

    async displayShiftsForWaiter(firstName: string) {
        const shifts = [];
        const waiter_shifts = await Waiters
            .findOne({ firstName: firstName }, { relations: ["days"] });
        if (waiter_shifts) {
            if (waiter_shifts.days.length > 0) {
                for (const day of waiter_shifts.days) {
                    shifts.push(day.weekday);
                }
            }
        }
        return shifts;
    }

    async displayWaitersForShift(day: string) {
        const waiters = [];
        const waiter_shifts = await Shifts
            .findOne({ weekday: day }, { relations: ["waiters_on_day"] })
        if (waiter_shifts.waiters_on_day.length > 0) {
            for (const waiter of waiter_shifts.waiters_on_day) {
                waiters.push(waiter.firstName);
            }
        }
        return waiters;
    }

    async clearWaitersTable() {
        await Waiters.delete({});
    }

    async clearWeekdayTable() {
        await Shifts.delete({});
    }
}