export default class TimeService {
    constructor($filter) {
        this.$filter = $filter;
    }

    getTimeZoneAbbr(timestring) {
        let abbr = new Date(timestring)
                    .toLocaleTimeString('en-us', {timeZoneName: 'short'})
                    .split(' ')[2];
        return abbr
    }

    getCalendarDate(timestring) {
        return this.$filter('date')(new Date(timestring), 'EEE, MMMM dd, yyyy')
    }

    getClockTime(timestring) {
        return this.$filter('date')(new Date(timestring), 'h:mm a')
    }

    offsetHour(timestring) {
        let offset = new Date(timestring).getHours() + 1;
        let newHour = new Date(timestring).setHours(offset);
        return this.getClockTime(newHour)
    }
}

TimeService.$inject = ['$filter'];
