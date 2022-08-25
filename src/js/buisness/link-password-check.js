'use strict';

import validateEmptyInput from '../utils/validateEmptyInput.js';
import sendRequest from '../utils/sendRequest.js';

const PASSWORDCHECK_API = 'api/v1/unlock';

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
			inputErrorText = 'Пароль не может быть длинее 16 символов';
			break;
	};

	if (!inputCorrectCondition) {
		input.nextElementSibling.innerText = inputErrorText;
		input.classList.add('error-input');
		return false;
	} else {
		input.nextElementSibling.innerText = '';
		input.classList.remove('error-input');
		return true;
	};
};


async function submitPasswordCheckForm() {
	event.preventDefault();

	let isValid = validatePasswordCheckInput(passwordCheckInput) && validateEmptyInput(passwordCheckInput);

	if (isValid) {
		let objFromInputs = {};
		objFromInputs.password = passwordCheckInput.value;
		objFromInputs.shortCode = window.location.search.replace('?', '');
		let jsonForReq = JSON.stringify(objFromInputs);

		passwordCheckInput.setAttribute('disabled', 'disabled');
		passwordCheckSubmitBtn.classList.add('loader');

		let { response, json } = await sendRequest('POST', PASSWORDCHECK_API, jsonForReq, { cookie: true });
    
		if (response.status === 302) return;

		if (json && json.error) {
			alert(json.error);
		} else {
			alert('Не получилось проверить пароль :( \nПожалуйста, попробуйте позже');
		};

		passwordCheckInput.removeAttribute('disabled');
		passwordCheckSubmitBtn.classList.remove('loader');
		passwordCheckForm.reset();
	};
};


