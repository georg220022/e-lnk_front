// Shortener Form Validation
const shortener = document.getElementById('shortener-form');
const shortenerSubmitBtn = document.getElementById('shortener-submitBtn');
const longLink = document.getElementById('long-link');
const shortLink = document.getElementById('short-link');
const heroBody = document.querySelector('.hero__body');
const shortLinkWrapper = document.querySelector('.form__input-wrapper--short-link');
const qrWrapper = document.querySelector('.hero__qr-body');

let allShortenerFields = shortener?.querySelectorAll('input');
let shortenerInputs = allShortenerFields ? Array.from(allShortenerFields).slice(0, -1) : null;

shortener?.setAttribute('novalidate', true);

function validateShortenerFilledInput(input) {
	const linkRegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
	let inputCorrectCondition;
	let inputErrorText;

	switch (input.name) {
		case ('longLink'):
			inputCorrectCondition = linkRegExp.test(input.value)
			inputErrorText = 'Введите корректный адрес ссылки';
			break;
	};

	if (!inputCorrectCondition && input.value != '') {
		input.nextElementSibling.innerText = inputErrorText;
		input.classList.add('error-input');
		return false;
	} else {
		input.nextElementSibling.innerText = '';
		input.classList.remove('error-input');
		return true;
	};
};

export function validateEmptyInput(input) {
	if (input.value === '') {
		input.nextElementSibling.innerText = 'Поле не должно быть пустым';
		input.classList.add('error-input');
		return false;
	} else {
		input.nextElementSibling.innerText = '';
		input.classList.remove('error-input');
		return true;
	};
};

shortenerInputs?.forEach(input => {
		input.addEventListener('blur', () => validateShortenerFilledInput(input));
		input.addEventListener('input', () => validateShortenerFilledInput(input));
});

shortener?.addEventListener('submit', function(event) {
	event.preventDefault();
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
					heroBody.classList.add('open');
				}
			});
	};
});

// Shortener HTTP Request(POST)
const SHORTENER_API = 'api/v1/links';
const qr = document.getElementById('qr');

function createShortenerObject() {
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
	const shortenerRequestOptions = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify(createShortenerObject()),
	};

	try {
		let response = await fetch(SHORTENER_API, shortenerRequestOptions);
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

export { shortLink };