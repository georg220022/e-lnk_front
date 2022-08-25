function ruDateToISODate(date) {
	let stringDate = date.replace(/(\.|\:| )/g, '');
	let year = stringDate.substring(4, 8);
	let month = stringDate.substring(2, 4);
	let day = stringDate.substring(0, 2);
	let hours = stringDate.substring(8, 10);
	let minutes = stringDate.substring(10, 12);
	date = `${year}-${month}-${day}T${hours}:${minutes}`;
	
	return date;
};

export default ruDateToISODate;