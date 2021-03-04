export const validateIp = (ip) => {
	if (!ip) {
		return false;
	}

	const expression = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	const ipRegExp = new RegExp(expression);

	return ipRegExp.test(ip.trim());
};

export const ipToInt = (ip) => {
	let numericIp = 0;

	ip.split('.').forEach((octet) => {
		numericIp <<= 8;
		numericIp += parseInt(octet);
	});

	return (numericIp >>> 0);
};
