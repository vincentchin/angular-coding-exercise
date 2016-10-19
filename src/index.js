import angular from 'angular';
import AppController from './controllers/AppController';
import styles from './sass/app.scss';

angular.module('App', [])
    .controller('AppController', AppController);

angular.bootstrap(document, ['App']);

