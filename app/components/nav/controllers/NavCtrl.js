app.controller('NavCtrl', ['$scope', 'nav', function($scope, nav){
  $scope.topNav = nav.getNavs('$root');
}]);