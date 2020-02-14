bud = (i, x, y, r) => {
    const startX = x
    const startY = y
    const startR = r
    var pedals = []
    const color = "hsl(0, 100%, " + Math.floor(45 + 55 * Math.random()) + "%)"
    while (r > 0) {
        pedals.push({i, x, y, r, color, border: "black"})
        r -= Math.random() * (startR / 10)
        if (Math.random() > 0.7) {
            x += r / 10
        } else {
            x = startX
        }
        if (Math.random() > 0.5) {
            y += r / 10
        } else {
            y = startY
        }
    }

    return pedals
}

stem = (svg, x, y, length, r) => {
    svg.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", r*2)
        .attr("height", length)
        .attr("fill", "green")
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

flower = (svg, i, x, y, r, length) => {
    stem(svg, x, y, length - 2 * r, r / 20)
    return bud(i, x, y, r).concat(leaves(x,y,r, length - 2 * r))
}

drawMessage = (message, textSize) => {
    var el = document.querySelector("#flowers svg text")
    while (el) {
        el.remove()
        el = document.querySelector("#flowers svg text")
    }
    if (!Array.isArray(message)) {
        message = [message]
    }
    message.forEach((msg, index) => {
        d3.select("#flowers svg").append("text")
            .attr("x", document.getElementById("flowers").offsetWidth / 2)             
            .attr("y", 1.2 * (1 + index) * textSize + "px")
            .attr("text-anchor", "middle")  
            .style("font-size", textSize + "px")
            .style("fill", "red")
            .text(msg)
    })
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
        data = data.concat(flower(svg, i, flowerR + i * (2 * flowerR + 10) + 10, 220, flowerR, flowerLength))
    }

    drawMessage(["Happy Valentine's Day! Click the flower buds.", "❤️ Dan"], 36)

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
    .on("click", (d) => d.i !== undefined && drawMessage(messages[d.i], 25))
}
