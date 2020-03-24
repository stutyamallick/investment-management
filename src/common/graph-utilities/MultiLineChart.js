import * as d3 from 'd3';

function multiLineChartUtility(data, accessors, divId, yAxisLabel, height, width) {

    var node = document.getElementById(divId);
    if (node !== null) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    var xDomain, yDomain, xDomainMin, yDomainMin, zoomArea;
    xDomain = 0;
    yDomain = 0;
    xDomainMin = 0;
    yDomainMin = 0;
    // set the dimensions and margins of the graph
    // var margin = { top: 40, right: 20, bottom: 30, left: 20 };
    const margin = { top: 40, left: 20, bottom: 10, right: 10 }

    var svg = d3.select("#" + divId)
        .append("svg")
        .attr("width", width + margin.top + margin.left + margin.right)
        .attr("height", height + margin.top + margin.left)
        .append("g")
        .attr("transform",
            "translate(" + (margin.top + margin.right) + "," + margin.bottom + ")");


    // set the ranges
    var x = d3.scalePoint().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // Scale the range of the data
    x.domain(data.map(function (d) { return d[accessors.mainAccesssor]; }));
    y.domain([0, d3.max(data, function (d) {
        return Math.max(d[accessors.line1Accessor], d[accessors.line2Accessor], d[accessors.line3Accessor]);
    })]);

    // first line definition //start
    var valueline1 = d3.line()
        .x(function (d) { return x(d[accessors.mainAccesssor]); })
        .y(function (d) { return y(d[accessors.line1Accessor]); });
    // second line definition
    var valueline2 = d3.line()
        .x(function (d) { return x(d[accessors.mainAccesssor]); })
        .y(function (d) { return y(d[accessors.line2Accessor]); });
    // third line definition
    var valueline3 = d3.line()
        .x(function (d) { return x(d[accessors.mainAccesssor]); })
        .y(function (d) { return y(d[accessors.line3Accessor]); });

    // Add the first line path.
    svg.append("path")
        .attr("clip-path", "url(#clip)")
        .data([data])
        .attr('class', 'line1')
        .style("fill", "none")
        .style("stroke", "#E59400")
        .style("stroke-width", "1px")
        .attr("d", valueline1);

    // Add the second line path.
    svg.append("path")
        .attr("clip-path", "url(#clip)")
        .data([data])
        .attr('class', 'line2')
        .style("fill", "none")
        .style("stroke", "#007300")
        .style("stroke-width", "1px")
        .attr("d", valueline2);

    // Add the second line path.
    svg.append("path")
        .attr("clip-path", "url(#clip)")
        .data([data])
        .attr('class', 'line3')
        .style("fill", "none")
        .style("stroke", "#1A8FBF")
        .style("stroke-width", "1px")
        .attr("d", valueline3);

    // Add the X Axis
    svg.append("g")
        .attr("class", "x-axis")
        .style("color", "#5D6677")
        .style('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .style("font-weight", "500")
        .style("font-size", "10px")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
            .tickPadding(5)
            .tickSize(5).tickFormat(function (d) { return d }))
        .call(g => g.select(".domain").style("color", "#252525"));

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y-axis")
        .style("color", "#5D6677")
        .style('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .style("font-weight", "500")
        .style("font-size", "10px")
        .call(d3.axisLeft(y)
            .tickFormat(d3.formatPrefix(".0", 1e6))
            .ticks(10)
            .tickPadding(5)
            .tickSize(5))
        .call(g => g.select(".domain").style("color", "#252525"));

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -(margin.top + margin.right))
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .style('font-size', '10px')
        .style("font-weight", "500")
        .style('fill', '#4c4c4c')
        .text(yAxisLabel)
}

export { multiLineChartUtility }