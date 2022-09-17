'use strict';

import validateEmptyInput from '../utils/validateEmptyInput.js';
import sendRequest from '../utils/sendRequest.js';

const PASSWORD_CHECK_API = 'api/v1/unlock';

const passwordCheckForm = document.getElementById('password-check-form');
const passwordCheckInput = passwordCheckForm.querySelector('input');
const passwordCheckSubmitBtn = document.getElementById('password-check-button');

passwordCheckForm.setAttribute('novalidate', true);

passwordCheckInput.addEventListener('blur', () => validatePasswordCheckInput(passwordCheckInput));
passwordCheckInput.addEventListener('input', () => validatePasswordCheckInput(passwordCheckInput));

passwordCheckForm.addEventListener('submit', submitPasswordCheckForm);


function validatePasswordCheckInput(input) {
	if (input.value === '') return true;

	let inputCorrectCondition = null;
	let inputErrorText = null;

	switch (input.name) {
		case ('linkPassword'):
			inputCorrectCondition = input.value.length < 16;
			inputErrorText = 'Пароль не может быть длиннее 16 символов';
			break;
	}

	if (!inputCorrectCondition) {
		input.nextElementSibling.innerText = inputErrorText;
		input.classList.add('error-input');
		return false;
	} else {
		input.nextElementSibling.innerText = '';
		input.classList.remove('error-input');
		return true;
	}
}


async function submitPasswordCheckForm(event) {
	event.preventDefault();

	let isValid = validatePasswordCheckInput(passwordCheckInput) && validateEmptyInput(passwordCheckInput);

	if (isValid) {
		let objFromInputs = {};
		objFromInputs.password = passwordCheckInput.value;
		objFromInputs.shortCode = window.location.search.replace('?', '');
		let jsonForReq = JSON.stringify(objFromInputs);

		passwordCheckInput.setAttribute('disabled', 'disabled');
		passwordCheckSubmitBtn.classList.add('loader');

		let { json } = await sendRequest('POST', PASSWORD_CHECK_API, jsonForReq, { cookie: true });

		if (json && json.longLink) {
			window.location.replace(json.longLink);
		} else if (json && json.error) {
			alert(json.error);
		} else {
			alert('Не получилось проверить пароль :( \nПожалуйста, попробуйте позже');
		}

		passwordCheckInput.removeAttribute('disabled');
		passwordCheckSubmitBtn.classList.remove('loader');
		passwordCheckForm.reset();
	}
}


