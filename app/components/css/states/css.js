angular.module('app').config(['$stateProvider', 'navProvider', 'path', function($stateProvider, navProvider, path){
  $stateProvider.state('css', {
    url: '/css',
    controller: 'CssCtrl',
    templateUrl: path.views + 'css/views/css.html'
  });

  navProvider.registerPage({
    name: 'CSS Tests',
    state: 'css'
  });
}]);