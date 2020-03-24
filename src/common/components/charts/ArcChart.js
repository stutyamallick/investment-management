import React, { Component } from "react";
import * as d3 from "d3";
import { getCurrencyString } from "../../../utils/currency";
import "./index.less";

class ArcChart extends Component {
	constructor(props) {
		super(props);
		this.createArcChart = this.createArcChart.bind(this);
	}
	createArcChart() {
		const {
			width,
			height,
			data,
			radius = 120,
			colors,
			isDonut,
			valueType
		} = this.props;

		if (!data) return;

		const node = this.node;
		if (node !== null) {
			while (node.firstChild) {
				node.removeChild(node.firstChild);
			}
		}

		const svg = d3
			.select(node)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			// .attr("transform", `translate(${width / 2}, ${width / 2})`);
			.attr("transform", `translate(${radius * 1.75}, ${radius + 20})`);
		const color = d3.scaleOrdinal(colors);
		const pie = d3
			.pie()
			.value(d => d.value)
			.sort(null);
		let innerRadius = 0;
		if (isDonut) innerRadius = radius - radius / 2;
		const arc = d3
			.arc()
			.innerRadius(innerRadius)
			.outerRadius(radius - radius / 10);
		const outerArc = d3
			.arc()
			.innerRadius(radius)
			.outerRadius(radius);

		svg
			.selectAll("path")
			.data(pie(data))
			.enter()
			.append("path")
			.attr("d", arc)
			.attr("fill", (d, i) => color(i).arcColor);
		svg.append("g").classed("labels", true);
		svg.append("g").classed("lines", true);
		svg.append("g").classed("values", true);
		if (!isDonut) {
			svg.append("g").classed("percentage", true);
		}

		// Polyline creation
		svg
			.select(".lines")
			.selectAll("polyline")
			.data(pie(data))
			.enter()
			.append("polyline")
			.attr("stroke", (d, i) => color(i).lineColor)
			.attr("points", function(d) {
				const pos = outerArc.centroid(d);
				pos[0] = radius * 1.5 * (midAngle(d) < Math.PI ? 1 : -1);
				return [arc.centroid(d), outerArc.centroid(d), pos];
			});

		svg
			.select(".labels")
			.selectAll("text")
			.data(pie(data))
			.enter()
			.append("text")
			.attr("dy", "1.2em")
			.attr("fill", (d, i) => color(i).textColor)
			.text(function(d) {
				return d.data.label;
			})
			.attr("transform", function(d) {
				const pos = outerArc.centroid(d);
				pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
				return `translate(${pos})`;
			})
			.style("text-anchor", function(d) {
				return midAngle(d) < Math.PI ? "start" : "end";
			});

		svg
			.select(".values")
			.selectAll("text")
			.data(pie(data))
			.enter()
			.append("text")
			.attr("dy", "-0.5em")
			.text(function(d) {
				return getCurrencyString(Number(d.data.value).toFixed(0), valueType);
			})
			.attr("transform", function(d) {
				const pos = outerArc.centroid(d);
				pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
				return `translate(${pos})`;
			})
			.style("text-anchor", function(d) {
				return midAngle(d) < Math.PI ? "start" : "end";
			});

		svg
			.select(".percentage")
			.selectAll("text")
			.data(pie(data))
			.enter()
			.append("text")
			.text(function(d) {
				return `${d.data.percentage}%`;
			})
			.attr("transform", function(d) {
				const pos = arc.centroid(d);
				return `translate(${pos})`;
			})
			.style("text-anchor", "middle");

		function midAngle(d) {
			return d.startAngle + (d.endAngle - d.startAngle) / 2;
		}
	}
	componentDidMount() {
		this.createArcChart();
	}
	componentDidUpdate() {
		this.createArcChart();
	}
	componentWillUnmount() {
		d3.select(this.node).remove();
	}
	render() {
		return <div className="chartBox" ref={node => (this.node = node)}></div>;
	}
}

export default ArcChart;
