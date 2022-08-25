import user from './user.js';
import router from '../router.js';
import PageSection from '../utils/PageSection.js';
import validateAuthFilledInput from '../utils/validateAuthFilledInput.js';
import validateEmptyInput from '../utils/validateEmptyInput.js';
import createObjectFromInputs from '../utils/createObjectFromInputs.js';
import sendRequest from '../utils/sendRequest.js';

import successRegistrationComponent from '../components/successRegistrationComponent.js';

const REGISTRATION_API = 'api/v1/registration';

let registrationFormVars = {}; 
let r = registrationFormVars;


function enableRegistrationForm() {
	r.registrationForm = document.getElementById('registration-form');
	r.registrationFormInputs = r.registrationForm.querySelectorAll('input');
	r.registrationFormSubmitBtn = document.getElementById('registration-submitBtn');

	r.registrationForm.setAttribute('novalidate', true);

	r.registrationFormInputs.forEach(input => {
		input.removeEventListener('blur', () => validateAuthFilledInput(input));
		input.removeEventListener('input', () => validateAuthFilledInput(input));
	});
	r.registrationForm.removeEventListener('submit', submitRegistrationForm);

	r.registrationFormInputs.forEach(input => {
		input.addEventListener('blur', () => validateAuthFilledInput(input));
		input.addEventListener('input', () => validateAuthFilledInput(input));
	});
	r.registrationForm.addEventListener('submit', submitRegistrationForm);
};


async function submitRegistrationForm() {
	event.preventDefault();

	let isValid = false;

	let validatedInputs = Array.from(r.registrationFormInputs).map(input => {
		let inputIsValid = validateAuthFilledInput(input) && validateEmptyInput(input);
		return inputIsValid;
	});

	isValid = validatedInputs.every(input => input === true);

	if (isValid) {
		let jsonForReq = JSON.stringify(
			createObjectFromInputs(r.registrationFormInputs, 'input.name === "email" || input.name == "password"'));

		r.registrationFormSubmitBtn.classList.add('loader');
		r.registrationFormInputs.forEach((input) => input.setAttribute('disabled', 'disabled'));

		let { json } = await sendRequest('POST', REGISTRATION_API, jsonForReq, { cookie: true });

		if (json && json.access) {
			user.email = json.email;
			user.accessToken = json.access;

			const registrationSection = new PageSection('registration-section');
			registrationSection.renderComponent(successRegistrationComponent(user.email));
		} else if (json && json.error) {
			alert(json.error);
		} else {
			alert('Не получилось выполнить регистрацию :( \nПожалуйста, попробуйте позже');
		};

		r.registrationFormSubmitBtn.classList.remove('loader');
		r.registrationFormInputs.forEach((input) => input.removeAttribute('disabled'));
		r.registrationForm.reset();
	};
};

export default enableRegistrationForm;