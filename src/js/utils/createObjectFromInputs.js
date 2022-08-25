function createObjectFromInputs(inputs, condition = true) {
	let object = {};

	for (let input of inputs) {
		if (eval(condition)) {
			object[input.name] = input.value;
		};
	};

	return object;
};

export default createObjectFromInputs;