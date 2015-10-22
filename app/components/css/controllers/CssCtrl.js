app.controller('CssCtrl', ['$scope', '$interval', function($scope, $interval){
  $scope.doughnuts = [73, 54, 32, 9, 97];

  // $interval(function() {
  //   if (!$scope.percentage || $scope.percentage == 100) $scope.percentage = 0;
  //   $scope.percentage = parseFloat(($scope.percentage + 0.1).toFixed(2));
  // }, 25);
}]);