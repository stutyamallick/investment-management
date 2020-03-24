export const API_VERSION = "v1";
export const API_BASE_URL = "https://dev.streamimapi.com/api";
export const PERFORMANCE = "Performance";
export const PROPERTY = "Property";
export const API_HEADERS = {
	authName: 'Bearer ',
	authToken: 'adal.idtoken'
}

function createApiUrl(apiName) {
	return `${API_BASE_URL}/${API_VERSION}/${apiName}`;
}
createApiUrl(`${PERFORMANCE}`)
export const API_URL = {
	user: `${API_BASE_URL}/${API_VERSION}/user`,
	// Performance Related API
	totalSf: createApiUrl(`${PERFORMANCE}/ByTotalSF`),
	equityInvested: createApiUrl(`${PERFORMANCE}/ByEquityInvested`),
	occupancyRate: createApiUrl(`${PERFORMANCE}/ByOccupancyRate`),
	onGoingSoldDeals: createApiUrl(`${PERFORMANCE}/ByOnGoingSoldDealsSummary`),
	soldRealizedDeals: `${API_BASE_URL}/${API_VERSION}/${PERFORMANCE}/SoldRealizedDealsTable`,
	onGoingActiveDeals: `${API_BASE_URL}/${API_VERSION}/${PERFORMANCE}/OnGoingActiveDealsTable`,
	totalUnfundedCommitment: `${API_BASE_URL}/${API_VERSION}/${PERFORMANCE}/ContributionDistributionsTotalUnFundedCommitment`,
	capitalAmountComp: `${API_BASE_URL}/${API_VERSION}/${PERFORMANCE}/ByCapitalAmountComparison`,
	contributionVsDistributions: `${API_BASE_URL}/${API_VERSION}/${PERFORMANCE}/ByContributionsVsDistributions`,
	assetSummaryTable: `${API_BASE_URL}/${API_VERSION}/${PERFORMANCE}/AssetSummaryTableByFund`,
	debtSummaryTable: `${API_BASE_URL}/${API_VERSION}/${PERFORMANCE}/DebtSummaryTableByFund`,

	// Property Maintaince API
	nameFilter: createApiUrl(`${PROPERTY}/NameFilter`),
	propertyTrackerDetails: createApiUrl(`${PROPERTY}/Details`),
	saveEditProperty: createApiUrl(`${PROPERTY}/Edit`),
	propertyMannualFields: createApiUrl(`${PROPERTY}/ManualFields`),
	propertyDetails: createApiUrl(`${PROPERTY}/GetById`),
};
