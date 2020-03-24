import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/performance/actions';
import DetailBox from '../../common/components/detail-box';
import ChartLegend from '../../common/components/chart-legend/index';
import { multiLineChartUtility } from '../../common/graph-utilities/MultiLineChart';
import { stackedBarChartUtility } from '../../common/graph-utilities/StackedBarChart';
import { getFormattedRowCellData } from '../../utils/currency';
import ReactTable from "react-table";
import Button from '../../common/components/button';
import "!style-loader!css-loader!react-table/react-table.css";
import '../../common/styles/react-table-styles-override.less';

const multiLineChartLegendData = [
    { "label": "Aggregate Contribution", "color": "#1A8FBF" },
    { "label": "Net Capital Balance", "color": "#007300" },
    { "label": "Cumulative Distribution", "color": "#E59400" }
];
const stackedBarChartLegendData = [
    { "label": "Contribution", "color": "#003764" },
    { "label": "Distribution", "color": "#81BD41" }
];
let multiLineChartAcessors = {
    "mainAccesssor": "quarter", "line1Accessor": "cumulativeContribution", "line2Accessor": "netCapitalBalance", "line3Accessor": "aggreteContribution"
};
let stackedBarChartKeys = ["contributions", "distributions"];
let stackedBarChartColors = ["#003764", "#81BD41"];

class FundWisePerformance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fundWiseBoxData: [],
            summaryTypeOptionButtons: [
                { "display": "Asset Summary", "key": "asset-summary" },
                { "display": "Debt Summary", "key": "debt-summary" }
            ],
            selectedFundKey: this.props.fundKey,
            selectedSummaryTableKey: "asset-summary",
            summaryTableData: []
        };
        this.AssetTableColumns = [
            { Header: "Property", accessor: "property", Cell: row => <span>{getFormattedRowCellData(row.value)}</span>  },
            { Header: "Acquisition Date", accessor: "acquisitionDate", Cell: row => <span>{getFormattedRowCellData(row.value)}</span>  },
            { Header: "JV Partner", accessor: "jvPartner", Cell: row => <span>{getFormattedRowCellData(row.value)}</span>  },
            { Header: "% Leased", accessor: "leasedPercentage", Cell: row => <span>{getFormattedRowCellData(row.value)}</span>  },
            { Header: "Current Debt", accessor: "currentDebt", Cell: row => <span>{getFormattedRowCellData(row.value)}</span>  },
            { Header: "Current Equity", accessor: "currentEquity", Cell: row => <span>{getFormattedRowCellData(row.value)}</span>  }
        ];
        this.debtTableColumns = [
            { Header: "Property", accessor: "property", Cell: row => <span>{getFormattedRowCellData(row.value)}</span>  },
            { Header: "Date of Loan", accessor: "dateOfLoan", Cell: row => <span>{getFormattedRowCellData(row.value)}</span>  },
            { Header: "Lender", accessor: "lender", Cell: row => <span>{getFormattedRowCellData(row.value)}</span>  },
            { Header: "Current Debt", accessor: "currentDebt", Cell: row => <span>{getFormattedRowCellData(row.value)}</span>  },
            { Header: "Total Loan", accessor: "totalLoanAmount", Cell: row => <span>{getFormattedRowCellData(row.value)}</span>  },
            { Header: "Interest Rate", accessor: "interestRate", Cell: row => <span>{getFormattedRowCellData(row.value)}</span>  }
        ];
    }

    componentDidMount() {
        this.props.getFundWiseHighlights(this.props.fundKey);
        this.props.getCapitalAmountComparison(this.props.fundKey);
        this.props.getContributionDistributionComparison(this.props.fundKey);
        this.props.getAssetSummaryData(this.props.fundKey);
        this.props.getDebtSummaryData(this.props.fundKey);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedFundKey !== this.props.fundKey) {
            this.props.getFundWiseHighlights(this.props.fundKey);
            this.props.getCapitalAmountComparison(this.props.fundKey);
            this.props.getContributionDistributionComparison(this.props.fundKey);
            this.props.getAssetSummaryData(this.props.fundKey);
            this.props.getDebtSummaryData(this.props.fundKey);
            this.setState({ selectedFundKey: this.props.fundKey })
        }
        if (this.props.assetSummaryData) {
            if (!prevState.summaryTableData.length && this.props.assetSummaryData.assetChart) {
                this.setState({ summaryTableData: this.props.assetSummaryData.assetChart })
            }
        }
    }

    onSummaryTypeButtonClick = (value) => {
        if (this.state.selectedSummaryTableKey !== value.key) {
            let summaryTableData = [];
            if (value.key === "asset-summary") {
                summaryTableData = this.props.assetSummaryData && this.props.assetSummaryData.assetChart 
                    ? this.props.assetSummaryData.assetChart : [];
            } else {
                summaryTableData = this.props.debtSummaryData && this.props.debtSummaryData.debtChart
                    ? this.props.debtSummaryData.debtChart : []
            }
            this.setState({ selectedSummaryTableKey: value.key, summaryTableData })
        }
    }

    render() {
        const { capitalAmountComparisonData, contributionDistributionComparisonData } = this.props;
        if (capitalAmountComparisonData && capitalAmountComparisonData.chartData && capitalAmountComparisonData.chartData.length) {
            multiLineChartUtility(
                capitalAmountComparisonData.chartData,
                multiLineChartAcessors, "multiLineChartCt", "CAPITAL AMOUNT", 200, 500
            );
        }

        if (contributionDistributionComparisonData && contributionDistributionComparisonData.chartData
            && contributionDistributionComparisonData.chartData.length) {
            stackedBarChartUtility(
                contributionDistributionComparisonData.chartData,
                stackedBarChartKeys,
                stackedBarChartColors, 200, 500, "propertyName", "stackedBarChartCt", "CONTRIBUTION/DISTRIBUTION ($)"
            );
        }

        return (
            <div>
                <div className="fund_wise_box_section_container">
                    {this.props.fundWiseHighlightData && this.props.fundWiseHighlightData.map(
                        (data) => <div className="fund_wise_box" key={data.display}>
                            <DetailBox
                                display={data.display}
                                value={data.value}
                                color={data.color}
                                single />
                        </div>
                    )}
                </div>
                <div className="key_metrix_graph_container">
                    <div className="key_metrix_graph">
                        <div id="multiLineChartCt"></div>
                        <ChartLegend data={multiLineChartLegendData} />
                    </div>
                    <div className="key_metrix_graph">
                        <div id="stackedBarChartCt"></div>
                        <ChartLegend data={stackedBarChartLegendData} />
                    </div>
                </div>
                <div className="fund_summary_btn">
                {
                        this.state.summaryTypeOptionButtons && this.state.summaryTypeOptionButtons.map((btn, i) => {
                            return <Button key={"btn_" + i}
                            label={btn.display}
                            isUpperCase
                            isSelected={this.state.selectedSummaryTableKey === btn.key}
                            onClick={() => this.onSummaryTypeButtonClick(btn)}
                        />
                        })
                }
                </div>
                <div className="summaryTableContainer">
                    <ReactTable
                        columns={this.state.selectedSummaryTableKey === "asset-summary" ? this.AssetTableColumns : this.debtTableColumns}
                        data={this.state.summaryTableData}
                        defaultPageSize={10}
                        showPagination={
                            this.state.summaryTableData && this.state.summaryTableData.length > 10 
                            ? true : false
                        }
                        showPageSizeOptions={false}
                        resizable={false}
                        className="-striped -highlight"
                        minRows={1}
                        noDataText="No data to display!" />
                </div>
                <br />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        fundWiseHighlightData: state.performance.fundWiseHighlightData,
        capitalAmountComparisonData: state.performance.capitalAmountComparisonData,
        contributionDistributionComparisonData: state.performance.contributionDistributionComparisonData,
        assetSummaryData: state.performance.assetSummaryData,
        debtSummaryData: state.performance.debtSummaryData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getFundWiseHighlights: (param) => dispatch(actions.getFundWiseHighlights(param)),
        getCapitalAmountComparison: (param) => dispatch(actions.getCapitalAmountComparison(param)),
        getContributionDistributionComparison: (param) => dispatch(actions.getContributionDistributionComparison(param)),
        getAssetSummaryData: (param) => dispatch(actions.getAssetSummaryData(param)),
        getDebtSummaryData: (param) => dispatch(actions.getDebtSummaryData(param))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FundWisePerformance);
