function createObjectFromInputs(inputs) {
	let object = {};

	for (let input of inputs) {
		if (input.value) {
			object[input.name] = input.value;
		}
	}

	return object;
}

export default createObjectFromInputs;