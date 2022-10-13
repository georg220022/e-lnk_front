import user from './user.js';
import { SETTINGS_API } from "./api.js";
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

		s.settingsForms?.forEach(form => {
			form.removeEventListener('submit', submitSettingsForm);
		})
		s.allFormsInputs?.forEach(input => {
			input.removeEventListener('blur', () => validateAuthFilledInput(input));
		});

		s.settingsForms = document.querySelectorAll('form');
		s.allFormsInputs = document.querySelectorAll('input');

		s.settingsForms.forEach(form => {
			form.addEventListener('submit', submitSettingsForm);
		})
		s.allFormsInputs.forEach(input => {
			input.addEventListener('blur', () => validateAuthFilledInput(input));
		});
	}
}

async function submitSettingsForm(event) {
	event.preventDefault();
	const form = event.target;
	const formInputs = form.querySelectorAll('input');
	const formSubmitBtn = form.querySelector('button[type="submit"]');
	const isNewEmailForm = form === document.querySelector('.settings-new-email-form');
	const isDeleteAccForm = form === document.querySelector('.settings-delete-acc-form');
	const isNewPasswordForm = form === document.querySelector('.settings-new-password-form');
	const isTimezoneForm = form === document.querySelector('.settings-timezone-form');
	const isStatisticsForm = form === document.querySelector('.settings-statistics-form');
	const formSelect = form.querySelector('select');

	let isValid = false;
	let validatedInputs = Array.from(formInputs).map(input => {
		return validateAuthFilledInput(input) && validateEmptyInput(input);
	});
	isValid = validatedInputs.every(input => input === true);

	if (isValid) {
		if (isNewEmailForm && formInputs[0].value === user.email) return alert('Вы ввели ваш E-mail');
		if (isNewPasswordForm && formInputs[0].value === formInputs[2].value) return alert('Новый и старый пароли не должны совпадать');
		if (isTimezoneForm && formSelect.value === s.userData.timezone) return alert('Выбранное значение равно текущему');
		if (isStatisticsForm &&
			(formSelect?.value === 'Да' && s.userData.sendStat === true) ||
			(formSelect?.value === 'Нет' && s.userData.sendStat === false)) return alert('Выбранное значение равно текущему');

		formSubmitBtn.classList.add('loader');
		formSubmitBtn.innerText = '';
		formInputs.forEach((input) => input.setAttribute('disabled', 'disabled'));

		if (isDeleteAccForm) {
			await user.delete();
			formSubmitBtn.innerText = 'Удалить';
		} else {
			let jsonForReq = {};
			if (isNewPasswordForm) {
				jsonForReq = JSON.stringify({ newPassword: formInputs[0].value, password: formInputs[2].value });
			} else {
				const objForReq = createObjectFromInputs(formInputs);
				if (formSelect) objForReq[formSelect.name] = formSelect.value;
				if (isStatisticsForm) objForReq.sendStat === 'Да' ? objForReq.sendStat = true : objForReq.sendStat = false;
				jsonForReq = JSON.stringify(objForReq);
			}
			let { response, json } = await user.sendRequest('PATCH', SETTINGS_API, jsonForReq, { cookie: true });
			if (response.ok) {
				if (isNewPasswordForm) {
					alert('Пароль успешно изменен!');
					await user.logout();
				} else {
					if (isNewEmailForm) alert(`E-mail успешно изменен! \nЧтобы подтвердить акканут, перейдите по ссылке из письма в вашем почтовом ящике ${formInputs[0].value}`);
					await enableSettings();
				}
			} else if (json && json.error) {
				alert(json.error);
			} else alert('Не получилось изменить данные :( \nПожалуйста, попробуйте позже');
			formSubmitBtn.innerText = 'Изменить';
		}

		formSubmitBtn.classList.remove('loader');
		formInputs.forEach((input) => input.removeAttribute('disabled'));
		form.reset();
	}
}

export default enableSettings;