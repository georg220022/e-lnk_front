function ISOStringToRuDateString(ISOString) {
	let ruDateString = new Date(ISOString)
		.toLocaleString('ru-RU')
		.replace(',', '')
		.slice(0, -3);

	return ruDateString;
};

export default ISOStringToRuDateString;