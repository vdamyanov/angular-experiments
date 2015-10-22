angular.module('app').config(['$stateProvider', 'navProvider', 'path', function($stateProvider, navProvider, path){
  $stateProvider.state('main', {
    url: '/',
    controller: 'MainCtrl',
    templateUrl: path.views + 'main/views/main.html'
  });

  navProvider.registerPage({
    name: 'Home',
    state: 'main',
  });
}]);