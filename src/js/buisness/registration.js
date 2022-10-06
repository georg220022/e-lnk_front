import user from './user.js';
import { REGISTRATION_API } from './api.js';
import PageSection from '../utils/PageSection.js';
import validateAuthFilledInput from '../utils/validateAuthFilledInput.js';
import validateEmptyInput from '../utils/validateEmptyInput.js';
import createObjectFromInputs from '../utils/createObjectFromInputs.js';
import sendRequest from '../utils/sendRequest.js';
import successRegistrationTemplate from '../templates/successRegistrationTemplate.js';

let registrationFormVars = {}; 
let r = registrationFormVars;

function enableRegistrationForm() {
	r.registrationFormSubmitBtn = document.getElementById('registration-submitBtn');

	r.registrationFormInputs?.forEach(input => {
		input.removeEventListener('blur', () => validateAuthFilledInput(input));
		input.removeEventListener('input', () => validateAuthFilledInput(input));
	});
	r.registrationForm?.removeEventListener('submit', submitRegistrationForm);

	r.registrationForm = document.getElementById('registration-form');
	r.registrationFormInputs = r.registrationForm.querySelectorAll('input');
	r.registrationForm.setAttribute('novalidate', 'true');

	r.registrationFormInputs.forEach(input => {
		input.addEventListener('blur', () => validateAuthFilledInput(input));
		input.addEventListener('input', () => validateAuthFilledInput(input));
	});
	r.registrationForm.addEventListener('submit', submitRegistrationForm);
}

async function submitRegistrationForm(event) {
	event.preventDefault();

	let isValid = false;
	let validatedInputs = Array.from(r.registrationFormInputs).map(input => {
		return validateAuthFilledInput(input) && validateEmptyInput(input);
	});
	isValid = validatedInputs.every(input => input === true);

	if (isValid) {
		let objFromInputs = createObjectFromInputs(r.registrationFormInputs);
		delete objFromInputs['repeat-password'];
		delete objFromInputs['consent-checkbox'];
		let timezone = (new Date()).toString().slice(28, 31);
		if (timezone.includes('0')) timezone = timezone.replace('0', '');
		objFromInputs.timezone = timezone;
		let jsonForReq = JSON.stringify(objFromInputs);

		r.registrationFormSubmitBtn.classList.add('loader');
		r.registrationFormSubmitBtn.innerText = '';
		r.registrationFormInputs.forEach((input) => input.setAttribute('disabled', 'disabled'));

		let { json } = await sendRequest('POST', REGISTRATION_API, jsonForReq, { cookie: true });

		if (json && json.access) {
			user.email = json.email;
			user.accessToken = json.access;

			const registrationSection = new PageSection('registration-section');
			registrationSection.render(successRegistrationTemplate(user.email));
		} else if (json && json.error) {
			alert(json.error);
		} else alert('Не получилось выполнить регистрацию :( \nПожалуйста, попробуйте позже');

		r.registrationFormSubmitBtn.classList.remove('loader');
		r.registrationFormSubmitBtn.innerText = 'Зарегистрироваться';
		r.registrationFormInputs.forEach((input) => input.removeAttribute('disabled'));
		r.registrationForm.reset();
	}
}

export default enableRegistrationForm;