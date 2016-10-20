import timeService from '../services/time.service';

export default class JSONService {
    constructor(timeService) {
        this._timeService = timeService;
    }

    formatJSON(jsonInput) {
        let jsonOutput = jsonInput.map( (e) => {
            let newDate = this._timeService.getCalendarDate(e["time"]),
                timeZone = this._timeService.getTimeZoneAbbr(e["time"]),
                clockTime = this._timeService.getClockTime(e["time"]),
                offsetTime = this._timeService.offsetHour(e["time"]);
            e["date"] = newDate;
            e["timeslot"] = clockTime + " - " + offsetTime + " " + timeZone;
            return e
            });

        return jsonOutput
    }

    getUniqueDates(jsonInput) {
        let dates = [];
        jsonInput.forEach((channel) => {
            let date = channel["date"];
            if (dates.indexOf(date) === -1) {
                dates.push(date);
            }
        })

        return dates
    }

    groupByDates(jsonInput, uniqueDates) {
        let groups = [];

        uniqueDates.forEach((i) => {
            let group = jsonInput.filter((e) => {
                return e["date"] === i;
            });
            let channel = {};
            channel["index"] = i;
            channel["group"] = group;
            groups.push(channel);
        })

        return groups
    }
}

JSONService.$inject = ['timeService'];
