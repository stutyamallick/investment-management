import React from 'react';
import AllFundPerformance from './AllFundPerformance';
import FundWisePerformance from './FundWisePerformance';
import MaintenanceFormButtons from '../../common/components/maintenance-form-buttons';
import Button from '../../common/components/button';


class Performance extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            fundOptionButtons: [
                { "display": "ALL FUNDS", "key": "all-fund" },
                { "display": "FUND A", "key": "fund-A" },
                { "display": "FUND B", "key": "fund-B" }
            ]
        })
    }

    onButtonClick = (value) => {
        this.props.history.push("./" + value.key);
    }

    render() {
        const { fundOptionButtons } = this.state;
        return (
            <React.Fragment>
                <div className="fundButton">
                    {
                            fundOptionButtons && fundOptionButtons.map((btn, i) => {
                                return <Button key={"btn_" + i}
                                label={btn.display}
                                isSelected={this.props.match.params.name === btn.key}
                                onClick={() => this.onButtonClick(btn)}
                            />
                        })
                    }
                </div>
                {this.props.match.params.name === "all-fund"
                    ? <AllFundPerformance />
                    : <FundWisePerformance
                        fundKey={this.props.match.params.name === "fund-A" ? 1 : 2} />
                }
            </React.Fragment>
        )
    }
}
export default Performance;
