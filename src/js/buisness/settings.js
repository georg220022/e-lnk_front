import user from './user.js';
import {SETTINGS_API, SEND_EMAIL_VERIFICATION_AGAIN_API} from "./api.js";
import validateAuthFilledInput from '../utils/validateAuthFilledInput.js';
import validateEmptyInput from '../utils/validateEmptyInput.js';
import createObjectFromInputs from '../utils/createObjectFromInputs.js';
import settingsTemplate from '../templates/settingsTemplate';
import PageSection from "../utils/PageSection";

const settings = {
	mainSection: new PageSection('main-section'),
	userData: null,

	async getUserData() {
		const {response, json} = await user.sendRequest('GET', SETTINGS_API);
		if (response.ok && json.timezone) {
			this.userData = json;
		} else alert('Не получилось загрузить настройки :( \nПожалуйста, попробуйте позже');
	},
}

const s = settings;

async function enableSettings() {
	s.mainSection.render('<div class="panel flex"><div class="loader"></div></div>');
	await s.getUserData();
	if (s.userData) {
		s.mainSection.render(settingsTemplate(settings.userData));

		if (!s.userData.isActivated) {
			s.sendEmailAgainForm?.removeEventListener('submit', submitSendEmailAgainForm);
			s.sendEmailAgainForm = document.querySelector('.settings-send-email-again-form');
			s.sendEmailAgainForm.addEventListener('submit', submitSendEmailAgainForm);
		}

		s.newEmailForm?.removeEventListener('submit', submitNewEmailForm);
		s.newEmailForm = document.querySelector('.settings-new-email-form');
		s.newEmailForm.addEventListener('submit', submitNewEmailForm);

		s.newPasswordForm?.removeEventListener('submit', submitNewPasswordForm);
		s.newPasswordForm = document.querySelector('.settings-new-password-form');
		s.newPasswordForm.addEventListener('submit', submitNewPasswordForm);

		s.timezoneForm?.removeEventListener('submit', submitTimezoneForm);
		s.timezoneForm = document.querySelector('.settings-timezone-form');
		s.timezoneForm.addEventListener('submit', submitTimezoneForm);

		s.statisticsForm?.removeEventListener('submit', submitStatisticsForm);
		s.statisticsForm = document.querySelector('.settings-statistics-form');
		s.statisticsForm.addEventListener('submit', submitStatisticsForm);

		s.deleteAccForm?.removeEventListener('submit', submitDeleteAccForm);
		s.deleteAccForm = document.querySelector('.settings-delete-acc-form');
		s.deleteAccForm.addEventListener('submit', submitDeleteAccForm);

		s.allFormsInputs?.forEach(input => {
			input.removeEventListener('blur', () => validateAuthFilledInput(input));
		});
		s.allFormsInputs = document.querySelectorAll('input');
		s.allFormsInputs.forEach(input => {
			input.addEventListener('blur', () => validateAuthFilledInput(input));
		});
	}
}

async function submitSendEmailAgainForm(event) {
	event.preventDefault();
	const form = event.target;
	const formSubmitBtn = form.querySelector('button[type="submit"]');

	formSubmitBtn.classList.add('loader');
	formSubmitBtn.innerText = '';

	let {response, json} = await user.sendRequest('POST', SEND_EMAIL_VERIFICATION_AGAIN_API, '', {cookie: true});

	if (response && response.ok) {
		form.innerHTML = `
				<div>
					<p>Письмо отправлено!</p>
					<br>
					<p>Для подтверждения аккаунта перейдите по&nbsp;ссылке из&nbsp;письма в&nbsp;вашем почтовом ящике.</p>
				</div>
			`;
	} else if (json && json.error) {
		alert(json.error);
	} else alert('Не получилось отправить письмо для подтверждения почты :( \nПожалуйста, попробуйте позже');

	formSubmitBtn?.classList.remove('loader');
	formSubmitBtn.innerText = 'Выслать код активации повторно';
}

async function submitNewEmailForm(event) {
	event.preventDefault();
	const form = event.target;
	const formInputs = form.querySelectorAll('input');
	const formSubmitBtn = form.querySelector('button[type="submit"]');

	let isValid = false;
	let validatedInputs = Array.from(formInputs).map(input => {
		return validateAuthFilledInput(input) && validateEmptyInput(input);
	});
	isValid = validatedInputs.every(input => input === true);

	if (isValid) {
		if (formInputs[0].value === user.email) return alert('Вы ввели ваш E-mail');

		formSubmitBtn.classList.add('loader');
		formSubmitBtn.innerText = '';
		formInputs.forEach((input) => input.setAttribute('disabled', 'disabled'));

		const jsonForReq = JSON.stringify(createObjectFromInputs(formInputs));

		let {response, json} = await user.sendRequest('PATCH', SETTINGS_API, jsonForReq, {cookie: true});

		if (response.ok) {
			alert('Пароль успешно изменен!');
			await user.logout();
		} else if (json && json.error) {
			alert(json.error);
		} else alert('Не получилось изменить данные :( \nПожалуйста, попробуйте позже');
	}

	formInputs.forEach((input) => input.removeAttribute('disabled'));
	formSubmitBtn.classList.remove('loader');
	formSubmitBtn.innerText = 'Изменить';
	form.reset();
}

async function submitNewPasswordForm(event) {
	event.preventDefault();
	const form = event.target;
	const formInputs = form.querySelectorAll('input');
	const formSubmitBtn = form.querySelector('button[type="submit"]');

	let isValid = false;
	let validatedInputs = Array.from(formInputs).map(input => {
		return validateAuthFilledInput(input) && validateEmptyInput(input);
	});
	isValid = validatedInputs.every(input => input === true);

	if (isValid) {
		if (formInputs[0].value === formInputs[2].value) return alert('Новый и старый пароли не должны совпадать');

		formSubmitBtn.classList.add('loader');
		formSubmitBtn.innerText = '';
		formInputs.forEach((input) => input.setAttribute('disabled', 'disabled'));

		const jsonForReq = JSON.stringify({ newPassword: formInputs[0].value, password: formInputs[2].value });

		let {response, json} = await user.sendRequest('PATCH', SETTINGS_API, jsonForReq, {cookie: true});

		if (response.ok) {
			alert(`E-mail успешно изменен! \nЧтобы подтвердить акканут, перейдите по ссылке из письма в вашем почтовом ящике ${formInputs[0].value}`);
			await enableSettings();
		} else if (json && json.error) {
			alert(json.error);
		} else alert('Не получилось изменить данные :( \nПожалуйста, попробуйте позже');
	}

	formInputs.forEach((input) => input.removeAttribute('disabled'));
	formSubmitBtn.classList.remove('loader');
	formSubmitBtn.innerText = 'Изменить';
	form.reset();
}

async function submitTimezoneForm(event) {
	event.preventDefault();
	const form = event.target;
	const formInputs = form.querySelectorAll('input');
	const formSubmitBtn = form.querySelector('button[type="submit"]');
	const formSelect = form.querySelector('select');

	let isValid = false;
	let validatedInputs = Array.from(formInputs).map(input => {
		return validateAuthFilledInput(input) && validateEmptyInput(input);
	});
	isValid = validatedInputs.every(input => input === true);

	if (isValid) {
		if (formSelect.value === s.userData.timezone) return alert('Выбранное значение равно текущему');

		formSubmitBtn.classList.add('loader');
		formSubmitBtn.innerText = '';
		formInputs.forEach((input) => input.setAttribute('disabled', 'disabled'));

		const jsonForReq = JSON.stringify({ timezone: formSelect.value, password: formInputs[0].value });

		let {response, json} = await user.sendRequest('PATCH', SETTINGS_API, jsonForReq, {cookie: true});

		if (response.ok) {
			await enableSettings();
		} else if (json && json.error) {
			alert(json.error);
		} else alert('Не получилось изменить данные :( \nПожалуйста, попробуйте позже');
	}

	formInputs.forEach((input) => input.removeAttribute('disabled'));
	formSubmitBtn.classList.remove('loader');
	formSubmitBtn.innerText = 'Изменить';
	form.reset();
}

async function submitStatisticsForm(event) {
	event.preventDefault();
	const form = event.target;
	const formInputs = form.querySelectorAll('input');
	const formSubmitBtn = form.querySelector('button[type="submit"]');
	const formSelect = form.querySelector('select');

	let isValid = false;
	let validatedInputs = Array.from(formInputs).map(input => {
		return validateAuthFilledInput(input) && validateEmptyInput(input);
	});
	isValid = validatedInputs.every(input => input === true);

	if (isValid) {
		if (
			(formSelect?.value === 'Да' && s.userData.sendStat === true) ||
			(formSelect?.value === 'Нет' && s.userData.sendStat === false)) return alert('Выбранное значение равно текущему');

		formSubmitBtn.classList.add('loader');
		formSubmitBtn.innerText = '';
		formInputs.forEach((input) => input.setAttribute('disabled', 'disabled'));

		const jsonForReq = JSON.stringify({ sendStat: formSelect.value === 'Да', password: formInputs[0].value });

		let {response, json} = await user.sendRequest('PATCH', SETTINGS_API, jsonForReq, {cookie: true});

		if (response.ok) {
			await enableSettings();
		} else if (json && json.error) {
			alert(json.error);
		} else alert('Не получилось изменить данные :( \nПожалуйста, попробуйте позже');
	}

	formInputs.forEach((input) => input.removeAttribute('disabled'));
	formSubmitBtn.classList.remove('loader');
	formSubmitBtn.innerText = 'Изменить';
	form.reset();
}

async function submitDeleteAccForm(event) {
	event.preventDefault();
	const form = event.target;
	const formInputs = form.querySelectorAll('input');
	const formSubmitBtn = form.querySelector('button[type="submit"]');

	let isValid = false;
	let validatedInputs = Array.from(formInputs).map(input => {
		return validateAuthFilledInput(input) && validateEmptyInput(input);
	});
	isValid = validatedInputs.every(input => input === true);

	if (isValid) {
		formSubmitBtn.classList.add('loader');
		formSubmitBtn.innerText = '';
		formInputs.forEach((input) => input.setAttribute('disabled', 'disabled'));

		const jsonForReq = JSON.stringify({ password: formInputs[0].value })

		let {response, json} = await user.sendRequest('PATCH', SETTINGS_API, jsonForReq, {cookie: true});

		if (response.ok) {
			await user.delete(jsonForReq);
		} else if (json && json.error) {
			alert(json.error);
		} else alert('Не получилось изменить данные :( \nПожалуйста, попробуйте позже');
	}

	formInputs.forEach((input) => input.removeAttribute('disabled'));
	formSubmitBtn.classList.remove('loader');
	formSubmitBtn.innerText = 'Удалить';
	form.reset();
}

export default enableSettings;