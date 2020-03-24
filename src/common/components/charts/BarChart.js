import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
	constructor(props) {
		super(props);
		this.createBarChart = this.createBarChart.bind(this);
	}
	createBarChart() {
		const { width, height, data, colors, yLabel } = this.props;
		const node = this.node;

		if (!data) return;

		if (node !== null) {
			while (node.firstChild) {
				node.removeChild(node.firstChild);
			}
		}

		const margin = { top: 20, right: 20, bottom: 20, left: 40 };
		const percentFormat = d3.format(".0%");
		const color = d3.scaleOrdinal(colors);

		const x = d3
			.scaleBand()
			.rangeRound([0, width])
			.padding(0.55);
		const y = d3.scaleLinear().rangeRound([height, 0]);

		const svg = d3
			.select(node)
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left + 10},${margin.top})`);

		const xAxis = d3.axisBottom(x);
		const yAxis = d3.axisLeft(y).tickFormat(percentFormat);

		x.domain(data.map(d => d.label));
		//y.domain(d3.extent(data, d => d.value)).nice(); // If we don't want to start y-axis from zero position
		y.domain([0, d3.max(data, d => d.value)]).nice();

		svg
			.append("g")
			.attr("class", "x-axis")
			.attr("transform", `translate(0,${height})`)
			.call(xAxis);

		svg
			.append("g")
			.attr("class", "y-axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", "-40")
			.attr("x", 0 - height / 2)
			.style("text-anchor", "middle")
			.style("fill", "#000000")
			.text(yLabel);

		svg
			.selectAll(".bar")
			.data(data)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("fill", (d, i) => color(i).barColor)
			.attr("x", d => x(d.label))
			.attr("width", x.bandwidth())
			.attr("y", d => y(d.value))
			.attr("height", d => height - y(d.value));

		// Add labels on top of bar chart
		svg
			.selectAll(".text")
			.data(data)
			.enter()
			.append("text")
			.attr("class", "bar-label")
			.attr("fill", (d, i) => color(i).textColor)
			.style("text-anchor", "middle")
			.attr("x", d => x(d.label) + x.bandwidth() / 2)
			.attr("y", d => y(d.value) - 4)
			.text(d => `${Math.round(d.value * 100)}%`);
	}
	componentDidMount() {
		this.createBarChart();
	}
	componentDidUpdate() {
		this.createBarChart();
	}
	componentWillUnmount() {
		d3.select(this.node).remove();
	}
	render() {
		return <div className="chartBox" ref={node => (this.node = node)}></div>;
	}
}

export default BarChart;
