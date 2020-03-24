export default [
	{
		display: "Performance",
		url: "performance/all-fund",
		allowBoth: true,
		subMenu: [
			{ display: "Fund A", url: "performance/fund-A" },
			{ display: "Fund B", url: "performance/fund-B" }
		]
	},
	{
		display: "Maintenance",
		subMenu: [
			{ display: "Property Maintenance", url: "property-maintenance" },
			{ display: "Lender Maintenance", url: "lender-maintenance" },
			{ display: "Loan Maintenance", url: "loan-maintenance" }
		]
	},
	{ display: "Reports", url: "reports" }
];
