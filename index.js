
bud = (x, y, r) => {
    const startX = x
    const startY = y
    var pedals = []
    while (r >= 0) {
        pedals.push({x, y, r, color: 'red'})
        r -= 3
        if (Math.random() > 0.7) {
            x += r / 10
        } else {
            x = startX
        }
        if (Math.random() > 0.7) {
            y += r / 10
        } else {
            y = startY
        }
    }

    return pedals
}

draw = () => {
    var svg = d3.select("#flowers")
                .append("svg")
                .style("width", "100%")
                .style("height", "100%")
                .style("background-color", "black")
                .append("g")

        data = []
        data = data.concat(bud(100, 200, 50))
        console.log(data)
        svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', function (d) {
            return d.r
        })
        .attr('cy', function (d) {
            return d.y
        })
        .attr('cx', function (d) {
            return d.x
        })
        .attr('fill', function (d) {
            return d.color;
        })
        .style("stroke", "black")
}
