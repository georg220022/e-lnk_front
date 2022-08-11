import user from './user.js';
import { validateEmptyInput } from '../utils.js';

const SHORTENER_API = 'api/v1/links';

const heroSection = document.getElementById('hero-section');

let shortenerObserver = new MutationObserver((mutations) => {
	const shortener = document.getElementById('shortener-form');

	if (shortener) {
		shortener.setAttribute('novalidate', true);

		let allShortenerFields = shortener?.querySelectorAll('input');
		let shortenerInputs = allShortenerFields ? Array.from(allShortenerFields).slice(0, -1) : null;

		shortenerInputs?.forEach(input => {
			input.removeEventListener('blur', () => validateShortenerFilledInput(input));
			input.removeEventListener('input', () => validateShortenerFilledInput(input));
		});

		shortener?.removeEventListener('submit', submitShortener);

		shortenerInputs?.forEach(input => {
			input.addEventListener('blur', () => validateShortenerFilledInput(input));
			input.addEventListener('input', () => validateShortenerFilledInput(input));
		});

		shortener?.addEventListener('submit', submitShortener);
	};
});

shortenerObserver.observe(heroSection, { subtree: true, childList: true });


function submitShortener(event) {
	const shortener = document.getElementById('shortener-form');
	const shortenerSubmitBtn = document.getElementById('shortener-submitBtn');
	const longLink = document.getElementById('long-link');
	const shortLink = document.getElementById('short-link');
	const heroBody = document.querySelector('.hero__content');
	const shortLinkWrapper = document.querySelector('.form__input-wrapper--short-link');
	const qrWrapper = document.querySelector('.hero__qr-body');

	event.preventDefault();

	let allShortenerFields = shortener?.querySelectorAll('input');
	let shortenerInputs = allShortenerFields ? Array.from(allShortenerFields).slice(0, -1) : null;

	let isValid = false;

	let validatedInputs = shortenerInputs.map(input => {
		let inputIsValid = validateShortenerFilledInput(input) && validateEmptyInput(longLink);
		return inputIsValid;
	});

	isValid = validatedInputs.every(input => input === true);

	if (isValid) {
		shortenerSubmitBtn.classList.add('loader');
		allShortenerFields.forEach((input) => input.setAttribute('disabled', 'disabled'));
		sendShortenerRequest()
			.then(() => {
				shortenerSubmitBtn.classList.remove('loader');
				allShortenerFields.forEach((input) => input.removeAttribute('disabled'));
				longLink.value = "";
				if (shortLink.value) {
					shortLinkWrapper.classList.add('open');
					qrWrapper.classList.add('open');
					heroBody?.classList.add('open');
				};
			});
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

function createShortenerObject() {
	const shortener = document.getElementById('shortener-form');
	let allShortenerFields = shortener?.querySelectorAll('input');
	let shortenerInputs = allShortenerFields ? Array.from(allShortenerFields).slice(0, -1) : null;
	let shortenerObject = {};

	for (let input of shortenerInputs) {
		if (input.value) {
			let name = input.name;
			shortenerObject[name] = input.value
		};
	};

	return shortenerObject;
};

async function sendShortenerRequest() {
	const shortLink = document.getElementById('short-link');
	const qr = document.getElementById('qr');

	const shortenerRequestOptions = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			'Authorization': user.accessToken ? `Bearer ${user.accessToken}` : '',
		},
		body: JSON.stringify(createShortenerObject()),
	};

	try {
		let response = await fetch(SHORTENER_API, shortenerRequestOptions);

		if (response.status === 401) {
			let refreshIsValid = await user.refreshTokens();
			if (refreshIsValid) {
				return sendShortenerRequest();
			} else return;
		};

		let json = await response.json();
		console.log('Полученный json (shortener):'); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
		console.log(json); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ

		if (json.shortLink && json.qr) {
			shortLink.value = json.shortLink;
			qr.src = `data:image/jpg;base64,${json.qr}`;
		} else if (json.error) {
			alert(json.error)
		}
	} catch (error) {
		alert('Не получилось сократить ссылку :( \nПожалуйста, попробуйте позже');
		console.error('ошибка при запросе (shortener): ' + error); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
	};
};
