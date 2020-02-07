bud = (x, y, r) => {
    const startX = x
    const startY = y
    const startR = r
    var pedals = []
    while (r >= 0) {
        pedals.push({x, y, r, color: 'red', border: "black"})
        r -= Math.random() * (startR / 10)
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

stem = (x, y, length, r) => {
    var stemPieces = []
    for (var i = 0; i < length; i++) {
        stemPieces.push({x, y: y + i, r, color: 'green', border: 'green'})
    }
    return stemPieces
}

flower = (x, y, r, length) => {
    return stem(x, y, length - 2 * r, r / 20).concat(bud(x, y, r))
}

draw = () => {
    var svg = d3.select("#flowers")
                .append("svg")
                .style("width", "100%")
                .style("height", "100%")
                .style("background-color", "black")
                .append("g")

    const flowerR = (document.getElementById("flowers").offsetWidth / 24 - 5)
    const flowerLength = (document.getElementById("flowers").offsetHeight)
    var data = []
    for (var i = 0; i < 12; i++) {
        console.log("HERE", i)
        data = data.concat(flower(flowerR + i * (2 * flowerR + 10) + 10, 200, flowerR, flowerLength))
    }
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
    .style("stroke", d => d.border)
}
