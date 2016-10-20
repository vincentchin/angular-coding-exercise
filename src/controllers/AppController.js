import json from '../json/channels.json';

export default class AppController {
    constructor(TimeService) {
        this._timeService = TimeService;
        this.json = json;
        this.channels = [];
        this.dates = [];
        this.initController();
    }

    initController() {
        this.formatJSON();
        this.countDates();
        this.groupByDates()
    }

    formatJSON() {
        let channels = this.json.map( (channel) => {
            let newDate = this._timeService.getCalendarDate(channel["time"]),
                timeZone = this._timeService.getTimeZoneAbbr(channel["time"]),
                clockTime = this._timeService.getClockTime(channel["time"]),
                offsetTime = this._timeService.offsetHour(channel["time"]);
            channel["date"] = newDate;
            channel["timeslot"] = clockTime + " - " + offsetTime + " " + timeZone;
            return channel
            });
        this.json = channels;
    }

    countDates() {
        let channels = this.json,
            dates = [];
        channels.forEach((channel) => {
            let date = channel["date"];
            if (dates.indexOf(date) === -1) {
                dates.push(date);
            }
        })

        this.dates = dates;
    }

    groupByDates() {
        let channels = this.json,
            dates = this.dates,
            groups = [];

        dates.forEach((e) => {
            let channelGroup = channels.filter((channel) => {
                return channel["date"] == e;
            });
            let channelObj = {};
            channelObj["index"] = e;
            channelObj["group"] = channelGroup;
            groups.push(channelObj);
        })

        this.channels = groups;
    }
}

AppController.$inject = ['TimeService'];
