import React from 'react';
import './index.less';

function ChartLegend(props) {
    return (
        <div className="legendsContainer">
            <div className="legendInnerContainer">
                {props.data.map(
                    (data) =>
                        <div key={data.label} className="legend">
                            <div className="legendIconContainer">
                                <div className="legendIcon" style={{ backgroundColor: data.color }}></div>
                            </div>
                            <div className="legendTextContainer">
                                <div className="legendText">{data.label}</div>
                            </div>
                        </div>
                )}
            </div>
        </div>
    )
}

export default ChartLegend;
