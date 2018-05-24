import angular from 'angular';
import "./service";

import './views/app.css';

let app = () => {
  return {
    template: require('./views/app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};


angular.module('app', [
  'myService'
])
  .directive('app', app)
  .controller('AppCtrl', ['$scope','myService',function ($scope,myService) {
    $scope.url = 'https://github.com/preboot/angular-webpack';
    $scope.name = myService.name;
  }]);

export default app;