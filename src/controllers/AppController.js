import json from '../json/channels.json';

export default class AppController {
    constructor($filter) {
        this.$filter = $filter;
        this.json = json;
        this.channels = [];
        this.dates = [];
        this.initializeController();
    }

    initializeController() {
        this.formatJSON();
        this.getDates();
        this.groupByDates()
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

    formatJSON() {
        let channels = this.json.map( (channel) => {
            let newDate = this.getCalendarDate(channel["time"]),
                timeZone = this.getTimeZoneAbbr(channel["time"]),
                clockTime = this.getClockTime(channel["time"]),
                offsetTime = this.offsetHour(channel["time"]);
            channel["date"] = newDate;
            channel["timeslot"] = clockTime + " - " + offsetTime + " " + timeZone;
            return channel
            });
        this.json = channels;
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

    getDates() {
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
}

AppController.$inject = ['$filter'];
