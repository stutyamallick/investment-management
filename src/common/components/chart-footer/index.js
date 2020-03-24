import React from "react";
import "./index.less";

function ChartFooter(props) {
	return (
		<div className="chart_footer_container">
			<label className="chart_footer_label">{props.text}</label>
		</div>
	);
}

export default ChartFooter;
