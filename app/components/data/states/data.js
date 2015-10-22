angular.module('app').config(['$stateProvider', 'navProvider', 'path', function($stateProvider, navProvider, path){
  $stateProvider.state('data', {
    url: '/data',
    controller: 'DataCtrl',
    templateUrl: path.views + 'data/views/data.html'
  });

  navProvider.registerPage({
    name: 'Data Visualizations',
    state: 'data'
  });
}]);