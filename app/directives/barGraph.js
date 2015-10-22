app.directive('barGraph', [function(){
  return {
    scope: {
      barGraph: '='
    },
    link: function(scope, element, attrs){
      var data;
      var dimensions = element[0].getBoundingClientRect();

      var margin = {top: 20, right: 20, bottom: 1000, left: 40},
          width = dimensions.width - margin.left - margin.right,
          height = dimensions.height - margin.top - margin.bottom;

      var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(15, "%");

      var svg = d3.select(element[0])
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.select("input").on("change", change);

      function change() {
        // Copy-on-write since tweens are evaluated after a delay.
        var x0 = x.domain(data.sort(this.checked
            ? function(a, b) { return b.percent - a.percent; }
            : function(a, b) { return d3.ascending(a.name, b.name); })
            .map(function(d) { return d.name; }))
            .copy();

        var transition = svg.transition().duration(750),
            delay = function(d, i) { return i * 50; };

        transition.selectAll(".bar")
            .attr("x", function(d) { return x0(d.name); });

        transition.select(".x.axis")
            .call(xAxis)
          .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");
      }

      scope.$watch('barGraph', function(value){
        if (value) {
          data = value;

          for (var i = data.length - 1; i >= 0; i--) {
            data[i].percent = data[i].percent/100
          };

          x.domain(data.map(function(d) { return d.name; }));
          y.domain([0, d3.max(data, function(d) { return d.percent; })]);

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
            .selectAll("text")
              .attr("y", 0)
              .attr("x", 9)
              .attr("dy", ".35em")
              .attr("transform", "rotate(90)")
              .style("text-anchor", "start");

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Percent");

          svg.selectAll(".bar")
              .data(data)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.name); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.percent); })
              .attr("height", function(d) { return height - y(d.percent); });
        }
      });
    }
  };
}]);