app.controller('MainCtrl', ['$scope', '$filter', function($scope, $filter){
  var list = []
  for (var i = 1; i <= 1000; i++) {
    list.push({
      id: i,
      name: "item"+i,
      date: new Date(),
    });
  };
  $scope.items = list;

  $scope.save = function(item){
    var current = this.item || item;
    console.log(current);
  }

  $scope.itemString = function(item){
    var current = this.item || item;
    return current.id%2+current.name+current.date;
  }
}]);