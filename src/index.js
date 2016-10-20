import angular from 'angular';
import AppController from './controllers/AppController';
import TimeService from './services/TimeService';
import styles from './sass/app.scss';

angular.module('App', [])
    .service('TimeService', TimeService)
    .controller('AppController', AppController);

angular.bootstrap(document, ['App']);

