export class WaiterManagerMock{
    async addWaiter(firstname: string, lastName: string, password: string) {
        console.log(firstname, lastName, password);
        return 'success';
    };

    async loadWeekdays() {
        return 'success';
    };

    async shiftWaiter(firstName: string, days: Array<string>) {
        return 'success';
    }

    async displayShiftsForWaiter(firstName: string) {
        return 'success';
    }

    async displayWaitersForShift(day: string) {
        return 'success';
    }

    async clearWaitersTable() {
        return 'success';
    }

    async clearWeekdayTable() {
        return 'success';
    }
}