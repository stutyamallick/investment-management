import React from 'react';
import { connect } from 'react-redux';
import './style.less';
import * as actions from '../../store/performance/actions';
import SectionHeaderTitle from '../../common/components/section-header-title';
import ChartHeader from '../../common/components/chart-header/index';
import ChartFooter from '../../common/components/chart-footer/index';
import DetailBox from '../../common/components/detail-box';
import { getFormattedRowCellData } from '../../utils/currency';
import moment from 'moment';
import Button from '../../common/components/button';
import { dateFormat } from '../../constants/constants';
import { PIE_RADIOUS, PIE_WIDTH, PIE_HEIGHT, PIE_COLOR, DONUT_COLOR, BARCHART_HEIGHT, BARCHART_WIDTH, BAR_COLOR } from '../../constants/graph';
import { getCurrencyString } from '../../utils/currency';
import ReactTable from "react-table";
import ArcChart from '../../common/components/charts/ArcChart';
import BarChart from '../../common/components/charts/BarChart';
import "!style-loader!css-loader!react-table/react-table.css";
import '../../common/styles/react-table-styles-override.less';

class AllFundPerformance extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            dealWisePerformance: [],
            dealTypeOptionButtons: [
                { "display": "Ongoing Deals", "key": "ongoing-deals" },
                { "display": "Sold Deals", "key": "sold-deals" }
            ],
            selectedFundKey: this.props.fundKey,
            selectedDealTableKey: "ongoing-deals",
            dealTableData: []
        })
    }

    componentDidMount() {
        this.props.getTotalSfData();
        this.props.getEquityInvestedData();
        this.props.getOccupancyRateData();
        this.props.getDealWisePerformance();
        this.props.getSoldDeals();
        this.props.getOngoingDeals();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.dealWisePerformance && !prevState.dealWisePerformance.length && this.props.dealWisePerformanceData) {
            let data = this.props.dealWisePerformanceData.deals;
            let dealWisePerformance = [];
            dealWisePerformance.push(
                this.computeDealWiseData(data.activeDeals, data.activeSquareFoot, data.activeCostBasis, data.activeEquityInvested)
            );
            dealWisePerformance.push(
                this.computeDealWiseData(data.soldDeals, data.soldSquareFoot, data.soldCostBasis, data.soldEquityInvested)
            );
            this.setState({ dealWisePerformance })
        }
        if (this.props.ongoingDealsData) {
            if (!prevState.dealTableData.length && this.props.ongoingDealsData.activeDeals) {
                this.setState({ dealTableData: this.props.ongoingDealsData.activeDeals })
            }
        }
    }

    computeDealWiseData = (highlightedValue, regularValue1, regularValue2, regularValue3) => {
        let regularData = [];
        regularData.push(this.getDataObjectInFormat("Square Foot", regularValue1));
        regularData.push(this.getDataObjectInFormat("Cost Basis", regularValue2));
        regularData.push(this.getDataObjectInFormat("Equity Invested", regularValue3));

        let obj = {
            highlightedData: this.getDataObjectInFormat("Deals", highlightedValue),
            regularData: regularData
        };

        return obj;
    }

    getDataObjectInFormat = (display, value) => {
        let obj = { display: display, value: value }
        return obj;
    }

    totalCount = (array, key) => {
        return array.reduce((r, a) => {
            return r + a[key];
        }, 0);
    }

    constructChartData = (data, accessor, isBarChart) => {
        let total = 0;
        if(accessor === "totalEquity") {
            total = this.totalCount(data, accessor);
        }
        let graphData = [];
        if (data) {
            for (let i = 0; i < data.length; i++) {
                let color = "#81bd41"
                if (isBarChart) {
                    switch (data[i].propertyType) {
                        case "Mixed Use":
                            color = "#81bd41";
                            break;
                        case "Industrial":
                            color = "#e59400";
                            break;
                        case "Office":
                            color = "#1a8fbf";
                            break;
                        default:
                            color = "#81bd41";
                    }
                }
                let currentGraphObj = {
                    "label": data[i].propertyType,
                    "value": data[i][accessor],
                    "color": color,
                    ...(accessor === "totalEquity" && { percentage: Math.round((data[i][accessor]/total) * 100) })
                }
                graphData.push(currentGraphObj)
            }
        }
        return graphData;
    }

    getTotalGraphValue = (data) => {
        let totalValue = 0;
        for (let i = 0; i < data.length; i++) {
            totalValue = totalValue + data[i].value;
        }
        return totalValue;
    }

    getLowestValue = (data) => {
        let highestValue = 100;
        for (let i = 0; i < data.length; i++) {
            if (data[i].value < highestValue) {
                highestValue = data[i].value
            }
        }
        return Math.round(highestValue * 100);
    }

    getDealsColumnData = () => {
        return this.state.selectedDealTableKey === "ongoing-deals"
        ? [
            { Header: "Property Name", accessor: "propertyName", Cell: row => <span>{getFormattedRowCellData(row.value)}</span> },
            { Header: "Property Location", accessor: "propertyLocation", Cell: row => <span>{getFormattedRowCellData(row.value)}</span> },
            { Header: "Property Type", accessor: "propertyType", Cell: row => <span>{getFormattedRowCellData(row.value)}</span> },
            { Header: "RSF", accessor: "rsf", Cell: row => <span>{getCurrencyString(Number(getFormattedRowCellData(row.value)).toFixed(0), "RSF")}</span> },
            { Header: "Average Occupancy", accessor: "avgOccupancy", Cell: row => <span>{Number(getFormattedRowCellData(row.value*100)).toFixed(0)+" %"}</span> }
        ]
        : [
            { Header: "Property Name", accessor: "propertyName", Cell: row => <span>{getFormattedRowCellData(row.value)}</span> },
            { Header: "Property Location", accessor: "propertyLocation", Cell: row => <span>{getFormattedRowCellData(row.value)}</span> },
            { Header: "Property Type", accessor: "propertyType", Cell: row => <span>{getFormattedRowCellData(row.value)}</span> },
            { Header: "RSF", accessor: "rsf", Cell: row => <span>{getCurrencyString(Number(getFormattedRowCellData(row.value)).toFixed(0), "RSF")}</span> },
            { Header: "Sales Price", accessor: "salesPrice", Cell: row => <span>{getCurrencyString(Number(getFormattedRowCellData(row.value)).toFixed(0), "Sales Price")}</span> },
            { Header: "Disposition Date", accessor: "dispositionDate", Cell: row => <span>{getFormattedRowCellData(moment(row.value).format(dateFormat))}</span> }
        ];
    }

    onDealTypeButtonClick = (value) => {
        if (this.state.selectedDealTableKey !== value.key) {
            let dealTableData = [];
            if (value.key === "ongoing-deals") {
                dealTableData = this.props.ongoingDealsData && this.props.ongoingDealsData.activeDeals
                    ? this.props.ongoingDealsData.activeDeals : [];
            } else {
                dealTableData = this.props.soldDealsData && this.props.soldDealsData.soldDeals
                    ? this.props.soldDealsData.soldDeals : [];
            }
            this.setState({ selectedDealTableKey: value.key, dealTableData })
        }
    }

    render() {
        let donutData, barChartData, pieData;
        donutData = [{"label":"Industrial","value":176863889.24,"color":"#81bd41"},{"label":"Mixed Use","value":65661681.32,"color":"#81bd41"},{"label":"Office","value":63242630.16,"color":"#81bd41"}];
        pieData = [{"label":"Industrial","value":18522010.69,"color":"#81bd41","percentage":11},{"label":"Mixed Use","value":118493310.7,"color":"#81bd41","percentage":71},{"label":"Office","value":29563687.12,"color":"#81bd41","percentage":18}];
        let totalSfValue = 0;
        let totalEquityInvestedValue = 0;
        let totalOccupancyRate = 0;
        if (this.props.totalSfData !== null) {
            donutData = this.constructChartData(this.props.totalSfData.totalSF, "totalSF");
            totalSfValue = getCurrencyString(this.getTotalGraphValue(donutData), 'Square Foot');
        }
        if (this.props.equityInvestedData !== null) {
            pieData = this.constructChartData(this.props.equityInvestedData.equityInvested, "totalEquity");
            totalEquityInvestedValue = getCurrencyString(
                Number(this.getTotalGraphValue(pieData)).toFixed(0), "totalEquity");
        }
        if (this.props.occupancyRateData !== null) {
            barChartData = this.constructChartData(this.props.occupancyRateData.occupancyRate, "avgOccupancy", true);
            totalOccupancyRate = this.getLowestValue(barChartData);
        }
        let dealsCloumnList = this.getDealsColumnData();
        return (
            <div>
                <div className="Performance_Highlights_Section">
                    <div className="sectionHeaderContainer">
                        <SectionHeaderTitle title="PERFORMANCE HIGHLIGHTS" />
                    </div>
                    <div className="chartContainer">
                        <div className="chartBlock">
                            <ChartHeader
                                mainHeader="Total SF"
                                subHeader="SF of Ongoing Deals" />
                            <ArcChart width={PIE_WIDTH} height={PIE_HEIGHT} data={donutData} colors={DONUT_COLOR} isDonut valueType={'Square Foot'} radius={PIE_RADIOUS} />
                            {this.props.totalSfData
                                ? <ChartFooter text={totalSfValue + " Square Footage of Active Deals"} />
                                : null}
                        </div>
                        <div className="chartBlock">
                            <ChartHeader
                                mainHeader="Equity Invested"
                                subHeader="Equity Invested in Ongoing Deals" />
                            <ArcChart width={PIE_WIDTH} height={PIE_HEIGHT} data={pieData} colors={PIE_COLOR} radius={PIE_RADIOUS} />
                            {this.props.equityInvestedData
                                ? <ChartFooter text={totalEquityInvestedValue + " Equity Invested in Active Deals"} />
                                : null}
                        </div>
                        <div className="chartBlock">
                            <ChartHeader
                                mainHeader="Occupancy Rate"
                                subHeader="Occupancy at Delivery" />
                            {/* <div id="barChartCt"></div> */}
                            <BarChart width={BARCHART_WIDTH} height={BARCHART_HEIGHT} data={barChartData} colors={BAR_COLOR} yLabel={"Occupancy %"} />
                            {this.props.occupancyRateData
                                ? <ChartFooter text={"Sold properties have an occupancy of " + totalOccupancyRate + "% or better at delivery"} />
                                : null}
                        </div>
                    </div>
                </div>
                {this.state.dealWisePerformance.length
                    ? <div className="Deal_Type_Comparison_Boxes_Container">
                        <div className="Ongoing_Deal_Box_Container">
                            <div className="sectionHeaderContainer">
                                <SectionHeaderTitle title="Ongoing Deals" />
                            </div>
                            <DetailBox
                                data={this.state.dealWisePerformance[0]}
                                color="#1A8FBF"
                            />
                        </div>
                        <div className="Sold_Deal_Box_Container">
                            <div className="sectionHeaderContainer">
                                <SectionHeaderTitle title="Sold Deals" />
                            </div>
                            <DetailBox
                                data={this.state.dealWisePerformance[1]}
                                color="#3DA88C"
                            />
                        </div>
                    </div>
                    : null
                }
                <div className="Performance_Statistics_Section">
                    <div className="statisticsHeaderContainer">
                        <SectionHeaderTitle title="PERFORMANCE STATISTICS" />
                    </div>
                    <div className="fund_deal_btn">
                        {
                            this.state.dealTypeOptionButtons && this.state.dealTypeOptionButtons.map((btn, i) => {
                                    return <Button key={"btn_" + i}
                                    label={btn.display}
                                    isUpperCase
                                    isSelected={this.state.selectedDealTableKey === btn.key}
                                    onClick={() => this.onDealTypeButtonClick(btn)}
                                />
                            })
                        }
                    </div>
                    <div className="summaryTableContainer">
                        <ReactTable
                            columns={dealsCloumnList}
                            data={this.state.dealTableData}
                            defaultPageSize={10}
                            showPagination={this.state.dealTableData.length > 10 ? true : false}
                            showPageSizeOptions={false}
                            resizable={false}
                            className="-striped -highlight"
                            minRows={1}
                            noDataText="No data to display!" />
                    </div>
                    <br />
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        totalSfData: state.performance.totalSfData,
        equityInvestedData: state.performance.equityInvestedData,
        occupancyRateData: state.performance.occupancyRateData,
        dealWisePerformanceData: state.performance.dealWisePerformanceData,
        soldDealsData: state.performance.soldDealsData,
        ongoingDealsData: state.performance.ongoingDealsData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getTotalSfData: () => dispatch(actions.getTotalSfData()),
        getEquityInvestedData: () => dispatch(actions.getEquityInvestedData()),
        getOccupancyRateData: () => dispatch(actions.getOccupancyRateData()),
        getDealWisePerformance: () => dispatch(actions.getDealWisePerformance()),
        getSoldDeals: () => dispatch(actions.getSoldDeals()),
        getOngoingDeals: () => dispatch(actions.getOngoingDeals())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFundPerformance);
