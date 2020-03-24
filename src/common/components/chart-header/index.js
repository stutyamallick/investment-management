import React from 'react';
import './index.less';

function ChartHeader(props) {
    return (
        <div className="chart_header_container">
            <label className="chart_main_label">{props.mainHeader}</label>
            <br />
            <label className="chart_sub_label">{props.subHeader}</label>
        </div>
    )
}

export default ChartHeader; 