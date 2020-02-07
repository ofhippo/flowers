
draw = () => {

    var svg = d3.select("#flowers")
                .append("svg")
                .style("width", "100%")
                .style("height", "100%")
                .style("background-color", "black")
                .append("g")

                var json = {
                    data: [
                      { radius: 15, color: 'red' },
                      { radius: 25, color: 'blue' },
                      { radius: 5, color: 'yellow' }
                    ]
                  };

        svg.selectAll('circle')
        .data(json.data)
        .enter()
        .append('circle')
        .attr('r', function (d) {
            return d.radius;
        })
        .attr('cy', function (d, i) {
            return 25;
        })
        .attr('cx', function (d, i) {
            var margin = 15,
                minWidth = 30;
            return (i * minWidth) + margin;
        })
        .attr('fill', function (d) {
            return d.color;
        });
}
