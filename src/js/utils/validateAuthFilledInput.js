function validateAuthFilledInput(input) {
	let inputCorrectCondition;
	let inputErrorText;

	switch (input.name) {
		case ('email'):
			const emailRegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
			let isEmail = emailRegExp.test(input.value);
			let emailMaxLength = input.value.length > 30;
			inputCorrectCondition = isEmail && !emailMaxLength;
			if (emailMaxLength) {
				inputErrorText = 'E-mail не может быть длиннее 30 символов';
			}
			if (!isEmail) {
				inputErrorText = 'Введите корректный E-mail';
			}
			break;
		case ('password'):
			const passwordRegExp = /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,}$/;
			let isPassword = passwordRegExp.test(input.value);
			let passwordMaxLength = input.value.length > 20;
			inputCorrectCondition = isPassword && !passwordMaxLength;
			if (passwordMaxLength) {
				inputErrorText = 'Пароль не может быть длиннее 20 символов';
			}
			if (!isPassword) {
				inputErrorText = 'Необходимо минимум 8 символов, 1 латинская буква и 1 цифра';
			}
			break;
		case ('repeat-password'):
			inputCorrectCondition = (input.value === input.closest('.form').querySelector('input[name="password"]').value)
			inputErrorText = 'Пароли не совпадают';
			break;
		case ('consent-checkbox'):
			inputCorrectCondition = input.checked
			inputErrorText = 'Необходимо согласиться с условиями';
			break;
	}

	if (!inputCorrectCondition && input.value !== '') {
		input.nextElementSibling.innerText = inputErrorText;
		input.classList.add('error-input');
		return false;
	} else {
		input.nextElementSibling.innerText = '';
		input.classList.remove('error-input');
		return true;
	}
}

export default validateAuthFilledInput;