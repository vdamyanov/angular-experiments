var app = angular.module('app', [
  'ui.router'
])
.config(['$urlRouterProvider', function($urlRouterProvider){
  $urlRouterProvider.otherwise('/');
}]);