import * as actionType from './actionTypes';

const initialState = {
    totalSfData: null,
    equityInvestedData: null,
    occupancyRateData: null,
    dealWisePerformanceData: null,
    soldDealsData: null,
    ongoingDealsData: null,
    fundWiseHighlightData: null,
    capitalAmountComparisonData: null,
    contributionDistributionComparisonData: null,
    assetSummaryData: null,
    debtSummaryData: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_TOTAL_SF_DATA:
            return { ...state, totalSfData: action.payload }

        case actionType.GET_EQUITY_INVESTED_DATA:
            return { ...state, equityInvestedData: action.payload }

        case actionType.GET_OCCUPANCY_RATE_DATA:
            return { ...state, occupancyRateData: action.payload }

        case actionType.GET_DEAL_WISE_PERFORMANCE:
            return { ...state, dealWisePerformanceData: action.payload }

        case actionType.GET_SOLD_DEALS_DATA:
            return { ...state, soldDealsData: action.payload }

        case actionType.GET_ONGOING_DEALS_DATA:
            return { ...state, ongoingDealsData: action.payload }

        case actionType.GET_FUND_WISE_HIGHLIGHT:
            return { ...state, fundWiseHighlightData: action.payload }

        case actionType.GET_CAPITAL_AMOUNT_COMPARISON:
            return { ...state, capitalAmountComparisonData: action.payload }

        case actionType.GET_CONTRIBUTION_DISTRIBUTION_COMPARISON:
            return { ...state, contributionDistributionComparisonData: action.payload }

        case actionType.GET_ASSET_SUMMARY_DATA:
            return { ...state, assetSummaryData: action.payload }

        case actionType.GET_DEBT_SUMMARY_DATA:
            return { ...state, debtSummaryData: action.payload }

        default:
            return state
    }
}

export default reducer;