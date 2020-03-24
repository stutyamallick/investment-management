import React from 'react';
import './index.less';
import { getCurrencyString } from '../../../utils/currency';

export default function DetailBox({ color, single, data, value, display }) {
        const detailBoxStyle = {
            backgroundColor: color
        }

        function getUnit(unitText) {
            return unitText === 'Square Foot' ? 'SF' : '';
        }

        return (
            <div className="detail-box-container" style={ detailBoxStyle }>
                {!single
                    ? <>
                        <div className="highlighted-section">
                            <div className="highlighted-section-value-container">
                                <div className="highlighted-value-text">
                                    {data.highlightedData.value}
                                </div>
                                <div className="highlighted-display-text">
                                    {data.highlightedData.display}
                                </div>
                            </div>
                        </div>
                        <div className="regular-section">
                            {data.regularData.map((data, i) =>
                                <div className="regular-section-value-container" key={"regular-section" + i}>
                                    <div className="value-container">
                                        <div className="regular-value-text">{`${getCurrencyString(data.value, data.display)} ${getUnit(data.display)}`}</div>
                                        <div className="regular-display-text">{data.display}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                    : <div className="single-section">
                        <div className="single-value-text">
                            {getCurrencyString(value, display)}
                        </div>
                        <div className="single-display-text">
                            {display}
                        </div>
                    </div>
                }
            </div>
        )
}
