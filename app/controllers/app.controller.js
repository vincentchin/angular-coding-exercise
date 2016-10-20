import json from '../json/channels.json';
import jsonService from '../services/json.service';

export default class AppController {
    constructor(jsonService) {
        this._jsonService = jsonService;
        this.json = json;
        this.channels = [];
        this.initialize();
    }

    initialize() {
        let formattedJSON = this._jsonService.formatJSON(this.json);
        let uniqueDates = this._jsonService.getUniqueDates(formattedJSON);
        this.channels = this._jsonService.groupByDates(formattedJSON, uniqueDates);
    }
}

AppController.$inject = ['jsonService'];
