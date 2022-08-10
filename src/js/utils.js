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
	const emailRegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
	const passwordRegExp = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
	let inputCorrectCondition;
	let inputErrorText;

	switch (input.name) {
		case ('email'):
			inputCorrectCondition = emailRegExp.test(input.value);
			inputErrorText = 'Введите корректный e-mail';
			break;
		case ('password'):
			inputCorrectCondition = passwordRegExp.test(input.value);
			inputErrorText = 'Необходимо минимум 8 символов, 1 латинская буква и 1 цифра';
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