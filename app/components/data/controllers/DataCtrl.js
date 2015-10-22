app.controller('DataCtrl', ['$scope', '$http', function($scope, $http){
  $http.get('/data/perftest1.json').success(function(response){
    $scope.perftest1 = response;
  }).error(function(data, status){
    console.log(status);
  });
  $http.get('/data/timeline.json').success(function(response){
    $scope.timeline = response;
  }).error(function(data, status){
    console.log(status);
  });
  $http.get('/data/timeline2.json').success(function(response){
    $scope.timeline2 = response;
  }).error(function(data, status){
    console.log(status);
  });
}]);