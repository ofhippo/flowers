bud = (i, x, y, r) => {
    const startX = x
    const startY = y
    const startR = r
    var pedals = []
    while (r >= 0) {
        pedals.push({i, x, y, r, color: 'red', border: "black"})
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

leaf = (x, y, r, direction) => {
    var pieces = []
    var radius = 2
    for (var i = 0; i < r && radius > 1; i+=2) {
        if (direction > 0) {
            pieces.push({x: x + direction * i - r + 2, y, r: radius, color: 'green', border: 'green'})
        } else {
            pieces.push({x: x + direction * i + r - 2, y, r: radius, color: 'green', border: 'green'})
        }
        if (i < r / 3.5) {
            radius += 2
        } else {
            radius -= 1
        }
    }
    return pieces
}

leaves = (x, y, r, height) => {
    var leafs = []
    const max = height / (r + 10)
    var num = Math.round(3 + Math.random() * (max - 3))
    for (var i = 2; i < num; i++) {
        const leafY = y + height * (i / num)
        if (Math.random() < 0.3) {
            leafs = leafs.concat(leaf(x, leafY, r, -1))
        }
    }
    var num = Math.round(3 + Math.random() * (max - 3))
    for (var i = 2; i < num; i++) {
        const leafY = y + height * (i / num)
        if (Math.random() < 0.3) {
            leafs = leafs.concat(leaf(x, leafY, r, 1))
        }
    }
    return leafs
}

flower = (i, x, y, r, length) => {
    return stem(x, y, length - 2 * r, r / 20).concat(bud(i, x, y, r)).concat(leaves(x,y,r, length - 2 * r))
}

message = (i, messages) => {
    alert(messages[i])
}

draw = (messages) => {
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
        data = data.concat(flower(i, flowerR + i * (2 * flowerR + 10) + 10, 200, flowerR, flowerLength))
    }
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
    .on("click", (d) => d.i !== undefined && message(d.i, messages))
}
