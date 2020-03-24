const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0
});

const notCurrency = ["Square Foot", "RSF"];

function getCurrencyString(curVal, unitText) {
	curVal = Math.round(curVal);
	const isCurrency = notCurrency.indexOf(unitText) === -1;   
	return `${isCurrency ? '$' : ''} ${formatter.format(curVal).substr(1)}`;
}

function getFormattedRowCellData (data) {
	const isNan = isNaN(data);

	if(!data && data !== "")
		return "-"
	else if(data === "")
		return "N/A";
	return isNan ? data : (isNegative(data) ? `(${toFixed(data) * -1})` : toFixed(data));
}

function isNegative(number) {
	return number < 0;
}

function isDecimal(number) {
	return number % 1 !== 0;
}

function toFixed(number) {
	return isDecimal(number) ? Number(number).toFixed(2) : number;
}

export { getCurrencyString, getFormattedRowCellData };