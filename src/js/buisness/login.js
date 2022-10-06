import user from './user.js';
import { LOGIN_API, RESET_PASSWORD_API } from "./api.js";
import router from '../router.js';
import validateAuthFilledInput from '../utils/validateAuthFilledInput.js';
import validateEmptyInput from '../utils/validateEmptyInput.js';
import createObjectFromInputs from '../utils/createObjectFromInputs.js';
import sendRequest from '../utils/sendRequest.js';

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
	l.loginForm.setAttribute('novalidate', 'true');

	l.loginFormInputs.forEach(input => {
		input.addEventListener('blur', () => validateAuthFilledInput(input));
	});
	l.loginForm.addEventListener('submit', submitLoginForm);


	l.resetPasswordFormInput?.removeEventListener('blur', () => validateAuthFilledInput(l.resetPasswordFormInput));
	l.resetPasswordForm?.removeEventListener('submit', submitResetPasswordForm);

	l.resetPasswordForm = document.getElementById('reset-password-form');
	l.resetPasswordFormInput = l.resetPasswordForm.querySelector('#reset-password-email');
	l.resetPasswordFormSubmitBtn = l.resetPasswordForm.querySelector('#reset-password-form-submitBtn');
	l.resetPasswordForm.setAttribute('novalidate', 'true');

	l.resetPasswordFormInput.addEventListener('blur', () => validateAuthFilledInput(l.resetPasswordFormInput));
	l.resetPasswordForm.addEventListener('submit', submitResetPasswordForm);

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
		} else alert('Не получилось выполнить вход :( \nПожалуйста, попробуйте позже');

		l.loginFormSubmitBtn.classList.remove('loader');
		l.loginFormSubmitBtn.innerText = 'Войти';
		l.loginFormInputs.forEach((input) => input.removeAttribute('disabled'));
		l.loginForm.reset();
	}
}

async function submitResetPasswordForm(event) {
	event.preventDefault();

	let isValid = validateAuthFilledInput(l.resetPasswordFormInput) && validateEmptyInput(l.resetPasswordFormInput);

	if (isValid) {
		let jsonForReq = JSON.stringify({ email: l.resetPasswordFormInput.value });

		l.resetPasswordFormSubmitBtn.classList.add('loader');
		l.resetPasswordFormSubmitBtn.innerText = '';
		l.resetPasswordFormInput.setAttribute('disabled', 'disabled');

		let { response, json } = await sendRequest('POST', RESET_PASSWORD_API, jsonForReq, {cookie: true});

		if (response && response.ok) {
			l.resetPasswordForm.innerHTML = `
				<div style="max-width: 260px; text-align: center">
					<p>На почту  <span style="color: #3d96e5">${l.resetPasswordFormInput.value} </span> была отправлена ссылка для сброса пароля.</p>
					<br>
					<p>В&nbsp;редких случаях письмо может идти до&nbsp;15&nbsp;минут.</p>
					<p>Если письмо не&nbsp;пришло обратитесь в&nbsp;поддержку: help@e-lnk.ru</p>
				</div>
			`;
		} else if (json && json.error) {
			alert(json.error);
		} else alert('Не получилось отправить письмо для сброса пароля :( \nПожалуйста, попробуйте позже');

		l.resetPasswordFormSubmitBtn.classList.remove('loader');
		l.resetPasswordFormSubmitBtn.innerText = 'Отправить';
		l.resetPasswordFormInput.removeAttribute('disabled');
		l.resetPasswordForm.reset();
	}
}

export default enableLoginForm;


