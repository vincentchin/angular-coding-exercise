import angular from 'angular';
import AppController from './controllers/app.controller';
import jsonService from './services/json.service';
import timeService from './services/time.service';
import styles from './sass/app.scss';

angular
    .module('app', [])
    .controller('AppController', AppController)
    .service('timeService', timeService)
    .service('jsonService', jsonService);

angular.bootstrap(document, ['app']);
