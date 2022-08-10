import user from './user.js';
import router from '../router.js';
import { PageSection, validateAuthFilledInput, validateEmptyInput } from '../utils.js';
import successRegistrationComponent from '../components/successRegistrationComponent.js';

const LOGIN_API = 'api/v1/login';
const REGISTRATION_API = 'api/v1/registration';

const modalSection = document.getElementById('modals-section');

let modalsObserver = new MutationObserver((mutations) => {
	const loginForm = document.getElementById('login-form');
	const registrationForm = document.getElementById('registration-form');

	if (loginForm) {
		const loginFormInputs = loginForm?.querySelectorAll('input');

		loginForm?.setAttribute('novalidate', true);

		loginFormInputs?.forEach(input => {
			input.removeEventListener('blur', () => validateAuthFilledInput(input));
			input.removeEventListener('input', () => validateAuthFilledInput(input));
		});

		loginForm?.removeEventListener('submit', submitLoginForm);

		loginFormInputs?.forEach(input => {
			input.addEventListener('blur', () => validateAuthFilledInput(input));
			input.addEventListener('input', () => validateAuthFilledInput(input));
		});

		loginForm?.addEventListener('submit', submitLoginForm);
	};

	if (registrationForm) {
		const registrationFormInputs = registrationForm?.querySelectorAll('input');

		registrationForm?.setAttribute('novalidate', true);

		registrationFormInputs?.forEach(input => {
			input.removeEventListener('blur', () => validateAuthFilledInput(input));
			input.removeEventListener('input', () => validateAuthFilledInput(input));
		});

		registrationForm?.removeEventListener('submit', submitRegistrationForm);

		registrationFormInputs?.forEach(input => {
			input.addEventListener('blur', () => validateAuthFilledInput(input));
			input.addEventListener('input', () => validateAuthFilledInput(input));
		});

		registrationForm?.addEventListener('submit', submitRegistrationForm);
	};
});

modalsObserver.observe(modalSection, { subtree: true, childList: true });


// Login
function submitLoginForm() {
	event.preventDefault();

	const loginForm = document.getElementById('login-form');
	const loginFormInputs = loginForm?.querySelectorAll('input');
	const loginFormSubmitBtn = document.getElementById('login-submitBtn');

	let isValid = false;

	let validatedInputs = Array.from(loginFormInputs).map(input => {
		let inputIsValid = validateAuthFilledInput(input) && validateEmptyInput(input);
		return inputIsValid;
	});

	isValid = validatedInputs.every(input => input === true);

	if (isValid) {
		loginFormSubmitBtn.classList.add('loader');
		loginFormInputs.forEach((input) => input.setAttribute('disabled', 'disabled'));
		sendLoginRequest()
			.then(() => {
				loginFormSubmitBtn.classList.remove('loader');
				loginFormInputs.forEach((input) => input.removeAttribute('disabled'));
				loginForm.reset();
			});
	};
};

function createLoginFormObject() {
	const loginForm = document.getElementById('login-form');
	const loginFormInputs = loginForm?.querySelectorAll('input');
	let loginFormObject = {};

	for (let input of loginFormInputs) {
		let name = input.name;
		loginFormObject[name] = input.value
	};

	return loginFormObject;
};

async function sendLoginRequest() {
	const loginRequestOptions = {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify(createLoginFormObject()),
	};

	try {
		let response = await fetch(LOGIN_API, loginRequestOptions);
		let json = await response.json();
		console.log('Полученный json (login_request):'); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
		console.log(json); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ

		if (json.access) {
			user.email = json.email;
			user.accessToken = json.access;
			router('#/');
		} else if (json.error) {
			alert(json.error);
		}
	} catch (error) {
		alert('Не получилось выполнить вход :( \nПожалуйста, попробуйте позже');
		console.error('ошибка при входе (login_request): ' + error); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
	};
};

// Registration
function submitRegistrationForm() {
	event.preventDefault();

	const registrationForm = document.getElementById('registration-form');
	const registrationFormInputs = registrationForm?.querySelectorAll('input');
	const registrationFormSubmitBtn = document.getElementById('registration-submitBtn');

	let isValid = false;

	let validatedInputs = Array.from(registrationFormInputs).map(input => {
		let inputIsValid = validateAuthFilledInput(input) && validateEmptyInput(input);
		return inputIsValid;
	});

	isValid = validatedInputs.every(input => input === true);

	if (isValid) {
		registrationFormSubmitBtn.classList.add('loader');
		registrationFormInputs.forEach((input) => input.setAttribute('disabled', 'disabled'));
		sendRegistrationRequest()
			.then(() => {
				registrationFormSubmitBtn.classList.remove('loader');
				registrationFormInputs.forEach((input) => input.removeAttribute('disabled'));
				registrationForm.reset();
			});
	};
};

function createRegistrationFormObject() {
	const registrationForm = document.getElementById('registration-form');
	const registrationFormInputs = registrationForm?.querySelectorAll('input');
	let registrationFormObject = {};

	for (let input of registrationFormInputs) {
		if (input.name === 'email' || input.name == 'password') {
			let name = input.name;
			registrationFormObject[name] = input.value;
		};
	};

	return registrationFormObject;
};

async function sendRegistrationRequest() {
	const registrationRequestOptions = {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify(createRegistrationFormObject()),
	};

	try {
		let response = await fetch(REGISTRATION_API, registrationRequestOptions);
		let json = await response.json();
		console.log('Полученный json (registration_request):'); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
		console.log(json); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ

		if (json.access) {
			user.email = json.email;
			user.accessToken = json.access;
			const registrationSection = new PageSection('registration-section');
			registrationSection.renderComponent(successRegistrationComponent(user.email), []);
		} else if (json.error) {
			alert(json.error);
		};
	} catch (error) {
		alert('Не получилось выполнить вход :( \nПожалуйста, попробуйте позже');
		console.error('ошибка при регистрации (registration_request): ' + error); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
	};
};