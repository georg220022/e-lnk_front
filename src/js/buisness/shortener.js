import user from './user.js';
import { validateEmptyInput, createJSONObjectFromInputs, sendRequest } from '../utils.js';

const SHORTENER_API = 'api/v1/links';

let shortenerVars = {}; 
let s = shortenerVars;

function enableShortener() {
	s.shortener = document.getElementById('shortener-form');
	s.allShortenerFields = s.shortener.querySelectorAll('input');
	s.shortenerInputs = Array.from(s.allShortenerFields).slice(0, -1);
	s.shortenerSubmitBtn = document.getElementById('shortener-submitBtn');
	s.longLink = document.getElementById('long-link');
	s.shortLink = document.getElementById('short-link');
	s.heroBody = document.querySelector('.hero__content');
	s.shortLinkWrapper = document.querySelector('.form__input-wrapper--short-link');
	s.qr = document.getElementById('qr');
	s.qrWrapper = document.querySelector('.hero__qr-body');

	s.shortener.setAttribute('novalidate', true);

	s.shortenerInputs?.forEach(input => {
		input.removeEventListener('blur', () => validateShortenerFilledInput(input));
		input.removeEventListener('input', () => validateShortenerFilledInput(input));
	});
	s.shortener?.removeEventListener('submit', submitShortener);

	s.shortenerInputs?.forEach(input => {
		input.addEventListener('blur', () => validateShortenerFilledInput(input));
		input.addEventListener('input', () => validateShortenerFilledInput(input));
	});
	s.shortener?.addEventListener('submit', submitShortener);
};

async function submitShortener(event) {
	event.preventDefault();

	let isValid = false;

	let validatedInputs = s.shortenerInputs.map(input => {
		let inputIsValid = validateShortenerFilledInput(input) && validateEmptyInput(s.longLink);
		return inputIsValid;
	});

	isValid = validatedInputs.every(input => input === true);

	if (isValid) {
		let jsonForReq = createJSONObjectFromInputs(s.shortenerInputs, 'input.value');

		s.shortenerSubmitBtn.classList.add('loader');
		s.allShortenerFields.forEach((input) => input.setAttribute('disabled', 'disabled'));

		let json = await sendRequest(SHORTENER_API, jsonForReq, user.accessToken);

		if (json && json.shortLink && json.qr) {
			s.shortLink.value = json.shortLink;
			s.qr.src = `data:image/jpg;base64,${json.qr}`;
			s.shortLinkWrapper.classList.add('open');
			s.qrWrapper.classList.add('open');
			s.heroBody?.classList.add('open');
		} else if (json && json.error) {
			alert(json.error);
		} else alert('Не получилось сократить ссылку :( \nПожалуйста, попробуйте позже');

		s.shortenerSubmitBtn.classList.remove('loader');
		s.allShortenerFields.forEach((input) => input.removeAttribute('disabled'));
		s.longLink.value = "";
	};
};

function validateShortenerFilledInput(input) {
	const linkRegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
	let linkIsCorrect;
	let linkContainsElnk;
	let inputErrorText;

	switch (input.name) {
		case ('longLink'):
			linkIsCorrect = linkRegExp.test(input.value) && input.value.at(-1) !== '.';
			linkContainsElnk = input.value.includes("e-lnk.ru");
			inputErrorText = 'Введите корректный адрес ссылки';
			break;
	};

	if (!linkIsCorrect && input.value != '') {
		input.nextElementSibling.innerText = inputErrorText;
		input.classList.add('error-input');
		return false;
	} else if (linkContainsElnk) {
		input.nextElementSibling.innerText = 'Это наша ссылка :) Введите другую';
		input.classList.add('error-input');
		return false;
	} else {
		input.nextElementSibling.innerText = '';
		input.classList.remove('error-input');
		return true;
	};
};


export default enableShortener;