function ruDateStringToISOString(ruDateString) {
	let stringDate = ruDateString.replace(/(\.|\:| )/g, '');
	let year = stringDate.substring(4, 8);
	let month = stringDate.substring(2, 4);
	let day = stringDate.substring(0, 2);
	let hours = stringDate.substring(8, 10);
	let minutes = stringDate.substring(10, 12);

	let date = new Date(year, month, day, hours, minutes);
	let ISOString = toISOString(date);

	return ISOString;
};

function toISOString(date) {
	let tzo = -date.getTimezoneOffset(),
		dif = tzo >= 0 ? '+' : '-',
		pad = function(num) {
			return (num < 10 ? '0' : '') + num;
		};

	return date.getFullYear() +
		'-' + pad(date.getMonth() + 1) +
		'-' + pad(date.getDate()) +
		'T' + pad(date.getHours()) +
		':' + pad(date.getMinutes()) +
		':' + pad(date.getSeconds()) +
		dif + pad(Math.floor(Math.abs(tzo) / 60)) +
		':' + pad(Math.abs(tzo) % 60);
};

export default ruDateStringToISOString;