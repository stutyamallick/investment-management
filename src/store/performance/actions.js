import * as actionType from './actionTypes';
import Axios from 'axios';
import { API_URL } from '../../constants/api';


export const getTotalSfData = query => (dispatch) => {
    const headers = {
        authorization: 'Bearer ' + localStorage.getItem('adal.idtoken')
    }
    Axios.get(API_URL.totalSf, {
        headers: headers
    })
        .then((response) => {
            dispatch({
                type: actionType.GET_TOTAL_SF_DATA,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log('Error while fetching data. ', error)
        })
}

export const getEquityInvestedData = query => (dispatch) => {
    const headers = {
        authorization: 'Bearer ' + localStorage.getItem('adal.idtoken')
    }
    Axios.get(API_URL.equityInvested, {
        headers: headers
    })
        .then((response) => {
            dispatch({
                type: actionType.GET_EQUITY_INVESTED_DATA,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log('Error while fetching data. ', error)
        })
}

export const getOccupancyRateData = query => (dispatch) => {
    let data = { "occupancyRate": [{ "propertyType": "Industrial", "avgOccupancy": 0.9033292242029656 }, { "propertyType": "Mixed Use", "avgOccupancy": 0.6680921787511485 }, { "propertyType": "Office", "avgOccupancy": 0.8855009277181453 }], "success": true, "version": 1, "message": null };
    /* const headers = {
        authorization: 'Bearer ' + localStorage.getItem('adal.idtoken')
    }
    Axios.get(API_URL.occupancyRate, {
        headers: headers
    })
        .then((response) => {
            dispatch({
                type: actionType.GET_OCCUPANCY_RATE_DATA,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log('Error while fetching data. ', error)
        }) */
    dispatch({
        type: actionType.GET_OCCUPANCY_RATE_DATA,
        payload: data
    })
}

export const getDealWisePerformance = query => (dispatch) => {
    let data = { "deals": { "soldDeals": 7, "soldCostBasis": 113683908.84, "soldSquareFoot": 803860, "soldEquityInvested": 53584858.51, "activeDeals": 54, "activeCostBasis": 123081274.26, "activeSquareFoot": 3658410, "activeEquityInvested": 130927493.11 }, "success": true, "version": 1, "message": null };
    /* const headers = {
        authorization: 'Bearer ' + localStorage.getItem('adal.idtoken')
    }
    Axios.get(API_URL.onGoingSoldDeals, {
        headers: headers
    })
        .then((response) => {
            dispatch({
                type: actionType.GET_DEAL_WISE_PERFORMANCE,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log('Error while fetching data. ', error)
        }) */
    dispatch({
        type: actionType.GET_DEAL_WISE_PERFORMANCE,
        payload: data
    })
}

export const getSoldDeals = query => (dispatch) => {
    const headers = {
        authorization: 'Bearer ' + localStorage.getItem('adal.idtoken')
    }
    Axios.get(API_URL.soldRealizedDeals, {
        headers: headers
    })
        .then((response) => {
            dispatch({
                type: actionType.GET_SOLD_DEALS_DATA,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log('Error while fetching data. ', error)
        })
}

export const getOngoingDeals = query => (dispatch) => {
    const headers = {
        authorization: 'Bearer ' + localStorage.getItem('adal.idtoken')
    }
    Axios.get(API_URL.onGoingActiveDeals, {
        headers: headers
    })
        .then((response) => {
            dispatch({
                type: actionType.GET_ONGOING_DEALS_DATA,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log('Error while fetching data. ', error)
        })
}

export const getFundWiseHighlights = query => (dispatch) => {
    let data = [
        { display: "TOTAL COMMITMENT", value: 7500000, color: "#1A8FBF" },
        { display: "CONTRIBUTION", value: 204819741.08, color: "#993299" },
        { display: "DISTRIBUTIONS", value: 0, color: "#E59400" },
        { display: "UNFUNDED COMMITMENT", value: 197319741.08, color: "#3DA88C" }
    ];
    dispatch({
        type: actionType.GET_FUND_WISE_HIGHLIGHT,
        payload: data
    })
    /* const headers = {
        authorization: 'Bearer ' + localStorage.getItem('adal.idtoken')
    }
    const params = {
        fundId: query
    }
    Axios.get(API_URL.totalUnfundedCommitment, {
        params: params,
        headers: headers
    })
        .then((response) => {
            let computedData = [];
            let data = response.data.fundStatistics;
            if (data !== undefined) {
                computedData = [
                    { display: "TOTAL COMMITMENT", value: data.totalCommitment, color: "#1A8FBF" },
                    { display: "CONTRIBUTION", value: data.contribution, color: "#993299" },
                    { display: "DISTRIBUTIONS", value: data.distribution, color: "#E59400" },
                    { display: "UNFUNDED COMMITMENT", value: data.unFundedCommitment, color: "#3DA88C" }
                ]
            }
            dispatch({
                type: actionType.GET_FUND_WISE_HIGHLIGHT,
                payload: computedData
            })
        })
        .catch((error) => {
            console.log('Error while fetching data. ', error)
        }) */
}

export const getCapitalAmountComparison = query => (dispatch) => {
    let data = { "chartData": [{ "aggregateContribution": 20279826756.65, "quarter": "Q4 2018", "year": "2018", "netCapitalBalance": 11795021937.46, "cumulativeContribution": 8484804819.19 }, { "aggregateContribution": 17651536370.55, "quarter": "Q1 2019", "year": "2019", "netCapitalBalance": 10849576235.87, "cumulativeContribution": 6801960134.68 }, { "aggregateContribution": 28934375801.2, "quarter": "Q2 2019", "year": "2019", "netCapitalBalance": 17487594715.93, "cumulativeContribution": 11446781085.27 }, { "aggregateContribution": 25620079742.61, "quarter": "Q3 2019", "year": "2019", "netCapitalBalance": 14918048528.75, "cumulativeContribution": 10702031213.86 }, { "aggregateContribution": 30551572582.89, "quarter": "Q4 2019", "year": "2019", "netCapitalBalance": 7234756693.38, "cumulativeContribution": 23316815889.51 }, { "aggregateContribution": 17316122741.93, "quarter": "Q1 2020", "year": "2020", "netCapitalBalance": 1527215377.91, "cumulativeContribution": 15788907364.02 }], "success": true, "version": 1, "message": null };
    dispatch({
        type: actionType.GET_CAPITAL_AMOUNT_COMPARISON,
        payload: data
    })
    /* const headers = {
        authorization: 'Bearer ' + localStorage.getItem('adal.idtoken')
    }
    const params = {
        fundId: query
    }
    Axios.get(API_URL.capitalAmountComp, {
        params: params,
        headers: headers
    })
        .then((response) => {
            dispatch({
                type: actionType.GET_CAPITAL_AMOUNT_COMPARISON,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log('Error while fetching data. ', error)
        }) */
}

export const getContributionDistributionComparison = query => (dispatch) => {
    let data = { "chartData": [{ "propertyName": "SRP Investors Fund A, L.P.", "contributions": 204819741.08, "distributions": 153703009, "contributionDate": null, "distributionDate": null }, { "propertyName": "Atlanta Portfolio", "contributions": 77457912.57, "distributions": 77183898.73, "contributionDate": null, "distributionDate": null }, { "propertyName": "River South", "contributions": 50621623.48, "distributions": 0, "contributionDate": null, "distributionDate": null }, { "propertyName": "Pacific Center", "contributions": 25819291, "distributions": 57783455, "contributionDate": null, "distributionDate": null }, { "propertyName": "SRPF A/425 W. Riverside, LP", "contributions": 17329217, "distributions": 0, "contributionDate": null, "distributionDate": null }, { "propertyName": "1771 N. Street", "contributions": 13995000, "distributions": 0, "contributionDate": null, "distributionDate": null }, { "propertyName": "Centerra", "contributions": 13827953.98, "distributions": 2500000, "contributionDate": null, "distributionDate": null }, { "propertyName": "East Cobb", "contributions": 12479464.67, "distributions": 1701607.92, "contributionDate": null, "distributionDate": null }, { "propertyName": "Dominion Point", "contributions": 11846648.62, "distributions": 4395575.82, "contributionDate": null, "distributionDate": null }, { "propertyName": "City Center", "contributions": 9786658.8, "distributions": 503112.02, "contributionDate": null, "distributionDate": null }], "success": true, "version": 1, "message": null };
    dispatch({
        type: actionType.GET_CONTRIBUTION_DISTRIBUTION_COMPARISON,
        payload: data
    })
    /* const headers = {
        authorization: 'Bearer ' + localStorage.getItem('adal.idtoken')
    }
    const params = {
        fundId: query
    }
    Axios.get(API_URL.contributionVsDistributions, {
        params: params,
        headers: headers
    })
        .then((response) => {
            dispatch({
                type: actionType.GET_CONTRIBUTION_DISTRIBUTION_COMPARISON,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log('Error while fetching data. ', error)
        }) */
}

export const getAssetSummaryData = query => (dispatch) => {
    const headers = {
        authorization: 'Bearer ' + localStorage.getItem('adal.idtoken')
    }
    const params = {
        fundId: query
    }
    Axios.get(API_URL.assetSummaryTable, {
        params: params,
        headers: headers
    })
        .then((response) => {
            dispatch({
                type: actionType.GET_ASSET_SUMMARY_DATA,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log('Error while fetching data. ', error)
        })
}

export const getDebtSummaryData = query => (dispatch) => {
    const headers = {
        authorization: 'Bearer ' + localStorage.getItem('adal.idtoken')
    }
    const params = {
        fundId: query
    }
    Axios.get(API_URL.debtSummaryTable, {
        params: params,
        headers: headers
    })
        .then((response) => {
            dispatch({
                type: actionType.GET_DEBT_SUMMARY_DATA,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log('Error while fetching data. ', error)
        })
}
