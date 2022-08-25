function validateEmptyInput(input) {
	if (input.value === '') {
		input.nextElementSibling.innerText = 'Поле не должно быть пустым';
		input.classList.add('error-input');
		return false;
	} else {
		input.nextElementSibling.innerText = '';
		input.classList.remove('error-input');
		return true;
	};
};

export default validateEmptyInput;