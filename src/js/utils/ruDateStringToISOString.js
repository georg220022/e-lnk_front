function ruDateStringToISOString(ruDateString) {
	const year = ruDateString.substring(6, 10);
	const month = ruDateString.substring(3, 5);
	const day = ruDateString.substring(0, 2);
	const hour = ruDateString.substring(11, 13);
	const minutes = ruDateString.substring(14, 16);
	const timezone = (new Date()).toString().slice(28, 31);

	return `${year}-${month}-${day}T${hour}:${minutes}:00${timezone}`;
}

export default ruDateStringToISOString;