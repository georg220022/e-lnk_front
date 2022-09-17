import user from './user.js';
import router from '../router.js';
import validateAuthFilledInput from '../utils/validateAuthFilledInput.js';
import validateEmptyInput from '../utils/validateEmptyInput.js';
import createObjectFromInputs from '../utils/createObjectFromInputs.js';
import sendRequest from '../utils/sendRequest.js';

const LOGIN_API = 'api/v1/login';

let loginFormVars = {}; 
let l = loginFormVars;


function enableLoginForm() {
	l.loginFormSubmitBtn = document.getElementById('login-submitBtn');

	l.loginFormInputs?.forEach(input => {
		input.removeEventListener('blur', () => validateAuthFilledInput(input));
	});
	l.loginForm?.removeEventListener('submit', submitLoginForm);

	l.loginForm = document.getElementById('login-form');
	l.loginFormInputs = l.loginForm.querySelectorAll('input');
	l.loginForm.setAttribute('novalidate', true);

	l.loginFormInputs.forEach(input => {
		input.addEventListener('blur', () => validateAuthFilledInput(input));
	});
	l.loginForm.addEventListener('submit', submitLoginForm);
}


async function submitLoginForm(event) {
	event.preventDefault();

	let isValid = false;

	let validatedInputs = Array.from(l.loginFormInputs).map(input => {
		return validateAuthFilledInput(input) && validateEmptyInput(input);
	});

	isValid = validatedInputs.every(input => input === true);

	if (isValid) {
		let jsonForReq = JSON.stringify(createObjectFromInputs(l.loginFormInputs));

		l.loginFormSubmitBtn.classList.add('loader');
		l.loginFormSubmitBtn.innerText = '';
		l.loginFormInputs.forEach((input) => input.setAttribute('disabled', 'disabled'));

		let { json } = await sendRequest('POST', LOGIN_API, jsonForReq, { cookie: true });

		if (json && json.access) {
			user.email = json.email;
			user.accessToken = json.access;

			document.querySelector('.modal--open')?.classList.remove('modal--open');
			document.querySelector('#body-section')?.classList.remove('lock');

			router('#/');
		} else if (json && json.error) {
			alert(json.error);
		} else {
			alert('Не получилось выполнить вход :( \nПожалуйста, попробуйте позже');
		}

		l.loginFormSubmitBtn.classList.remove('loader');
		l.loginFormSubmitBtn.innerText = 'Войти';
		l.loginFormInputs.forEach((input) => input.removeAttribute('disabled'));
		l.loginForm.reset();
	}
}

export default enableLoginForm;


