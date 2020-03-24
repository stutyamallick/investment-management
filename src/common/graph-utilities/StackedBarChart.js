import * as d3 from 'd3';

function stackedBarChartUtility(data, keys, colors, height, width, accessor, divId, yAxisLabel) {
    var chartNode = document.getElementById(divId);
    if (chartNode !== null) {
        while (chartNode.firstChild) {
            chartNode.removeChild(chartNode.firstChild);
        }
    }
    const margin = { top: 40, left: 20, bottom: 0, right: 10 }
    var svg = d3.select("#" + divId)
        .append("svg")
        .attr("width", width + margin.top + margin.left + margin.right)
        .attr("height", height + margin.top + margin.left)
        .append("g")
        .attr("transform", "translate(" + (margin.top + margin.right) + "," + margin.left + ")");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -(margin.left + margin.right))
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .style('font-size', '10px')
        .style("font-weight", "500")
        .style('fill', '#4c4c4c')
        .text(yAxisLabel)

    var x = d3.scaleBand()
        .range([margin.left, width])
        .padding(0.5)

    var y = d3.scaleLinear()
        .rangeRound([height, 2])

    var xAxis = svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .attr("class", "x-axis")

    var yAxis = svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .attr("class", "y-axis")

    var z = d3.scaleOrdinal()
        .range(colors)
        .domain(keys);

    data.forEach(function (d) {
        d.total = d3.sum(keys, k => +d[k])
        return d;
    })

    y.domain([0, d3.max(data, d => d3.sum(keys, k => +d[k]))]).nice();

    svg.selectAll(".y-axis").transition().duration(0)
        .style("color", "#5D6677")
        .style('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .style("font-weight", "500")
        .style("font-size", "10px")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .call(g => g.select(".domain").style("color", "#252525"));

    x.domain(data.map(d => d[accessor]));

    svg.selectAll(".x-axis").transition().duration(0)
        .style("color", "#5D6677")
        .style('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .style("font-weight", "500")
        .style("font-size", "10px")
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .call(g => g.select(".domain").style("color", "#252525"));

    var group = svg.selectAll("g.layer")
        .data(d3.stack().keys(keys)(data), d => d.key)

    group.exit().remove()

    group.enter().append("g")
        .classed("layer", true)
        .attr("fill", d => z(d.key));

    var bars = svg.selectAll("g.layer").selectAll("rect")
        .data(d => d, e => e.data[accessor]);

    bars.exit().remove()

    bars.enter().append("rect")
        .attr("width", x.bandwidth())
        .merge(bars)
        .transition().duration(0)
        .attr("x", d => x(d.data[accessor]))
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]));

    /* Uncomment below block to add text on top of the bar */
    /*var text = svg.selectAll(".text")
        .data(data, d => d[accessor]);

    text.exit().remove()

    text.enter().append("text")
        .attr("class", "text")
        .attr("text-anchor", "middle")
        .merge(text)
    .transition().duration(0)
        .attr("x", d => x(d[accessor]) + x.bandwidth() / 2)
        .attr("y", d => y(d.total) - 5)
        .text(d => d.total)*/
}

export { stackedBarChartUtility }