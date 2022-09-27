function ruDateStringToISOString(ruDateString) {
	const stringDate = ruDateString.replace(/\.|:|/g, '');
	const year = stringDate.substring(4, 8);
	const month = stringDate.substring(2, 4);
	const day = stringDate.substring(0, 2);
	const hour = stringDate.substring(8, 10);
	const minutes = stringDate.substring(10, 12);
	const timezone = (new Date()).toString().slice(28, 31)

	return `${year}-${month}-${day}T${hour}:${minutes}:00${timezone}`
}

export default ruDateStringToISOString;