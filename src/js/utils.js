export class PageSection { 
	constructor(id) {
  	this.id = document.getElementById(id);
  }

  renderComponent(component) {
    this.id.innerHTML = component;
  }
};


export function validateEmptyInput(input) {
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


export function validateAuthFilledInput(input) {
	let inputCorrectCondition;
	let inputErrorText;

	switch (input.name) {
		case ('email'):
			const emailRegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
			let isEmail = emailRegExp.test(input.value);
			let emailMaxLength = input.value.length > 30;
			inputCorrectCondition = isEmail && !emailMaxLength;
			if (emailMaxLength) {
				inputErrorText = 'E-mail не может быть длинее 30 символов';
			};
			if (!isEmail) {
				inputErrorText = 'Введите корректный E-mail';
			};
			break;
		case ('password'):
			const passwordRegExp = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
			let isPassword = passwordRegExp.test(input.value);
			let passwordMaxLength = input.value.length > 20;
			inputCorrectCondition = isPassword && !passwordMaxLength;
			if (passwordMaxLength) {
				inputErrorText = 'Пароль не может быть длинее 20 символов';
			};
			if (!isPassword) {
				inputErrorText = 'Необходимо минимум 8 символов, 1 латинская буква и 1 цифра';
			};
			break;
		case ('repeat-password'):
			inputCorrectCondition = (input.value === input.closest('.form').querySelector('input[name="password"]').value)
			inputErrorText = 'Пароли не совпадают';
			break;
		case ('consent-checkbox'):
			inputCorrectCondition = input.checked
			inputErrorText = 'Необходимо согласиться с условиями';
			break;
	};

	if (!inputCorrectCondition && input.value != '') {
		input.nextElementSibling.innerText = inputErrorText;
		input.classList.add('error-input');
		return false;
	} else {
		input.nextElementSibling.innerText = '';
		input.classList.remove('error-input');
		return true;
	};
};


export async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('copied to clipboard'); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
  } catch (error) {
    console.error(error); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
  };
};


export function createObjectFromInputs(inputs, condition = true) {
	let object = {};

	for (let input of inputs) {
		if (eval(condition)) {
			object[input.name] = input.value;
		};
	};

	return object;
};

export async function sendRequest(api, body, token = false, cookie = false) {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
		},
		body: body,
	};

	if (token) {
		requestOptions.headers['Authorization'] = `Bearer ${token}`;
	};

	if (cookie) {
		requestOptions.credentials = 'include';
	};

	try {
		var response = await fetch(api, requestOptions);
		try {
			var json = await response.json();
			console.log(`Полученный json (${api}):`); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
			console.log(json); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
		} catch (e) {};
	} catch (error) {
		console.error(`ошибка при запросе (${api}): ${error}`); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
	};

	return { response, json	};
};

export function ruDateToISODate(date) {
	let stringDate = date.replace(/(\.|\:| )/g, '');
	let year = stringDate.substring(4, 8);
	let month = stringDate.substring(2, 4);
	let day = stringDate.substring(0, 2);
	let hours = stringDate.substring(8, 10);
	let minutes = stringDate.substring(10, 12);
	date = `${year}-${month}-${day}T${hours}:${minutes}`;
	
	return date;
};



