angular.module('app').provider('nav', function(){
  var allNavs = {};
  var extractor = function(state, collection, val){
    var childrenStates = state.split(".");
    var result = collection;

    for (var i = 0; i < childrenStates.length; i++) {
      var attr = childrenStates[i];

      if (!result[attr]){
        result[attr] = {};
      }

      if (val && i == childrenStates.length-1){
        result[attr] = val;

        if (!result.children){
          result.children = [];
        }

        result.children.push(attr);
        return collection;
      }

      result = result[attr];
    }

    return result;
  };

  return {
    registerPage: function(page){
      extractor(page.state, allNavs, page);
    },
    registerPages: function(pages){
      for (var i = 0; i < pages.length; i++) {
        this.registerPage(pages[i]);
      };
    },
    $get: function(){
      return {
        getPage: function(state){
          return angular.copy(extractor(state, allNavs));
        },
        getNavs: function(state){
          var pages = [],
              parent;

          if (state === '$root'){
            parent = allNavs;
          } else {
            parent = extractor(state, allNavs);
          }

          for (var i = 0; i < parent.children.length; i++) {
            var child = parent.children[i];
            pages.push(parent[child]);
          };

          return angular.copy(pages);
        }
      };
    }
  };
});