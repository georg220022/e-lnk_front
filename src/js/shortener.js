// Validation
const shortener = document.getElementById('shortener-form');
const shortenerSubmitBtn = document.getElementById('submit-btn');
const longLink = document.getElementById('long-link');
const shortLink = document.getElementById('short-link');

const linkRegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

let shortenerInputs = shortener.querySelectorAll('input');
let shortenerErrors = 0;

shortener.setAttribute('novalidate', true);

function validateFilledInput(input) {
	switch (input.name) {
		case ('long-link'):
			if (!linkRegExp.test(input.value) && input.value != '') {
				input.nextElementSibling.innerText = 'Введите корректный адрес ссылки';
				input.classList.add('error-input');
				return false;
			} else {
				input.nextElementSibling.innerText = '';
				input.classList.remove('error-input');
				return true;
			};
			break;
	};
};

function validateEmptyInput(input) {
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

shortenerInputs.forEach(input => {
	if (input != shortLink) {
		input.addEventListener('blur', () => validateFilledInput(input));
		input.addEventListener('input', () => validateFilledInput(input));
	};
});

shortener.addEventListener('submit', function(event) {
	event.preventDefault();
	let isValid = false;

	shortenerInputs.forEach(input => {
		if (input != shortLink) {
			isValid = validateFilledInput(input) && validateEmptyInput(longLink);
		};
	});

	if (isValid) {
		shortenerSubmitBtn.classList.add('loader');
		shortenerInputs.forEach((input) => input.setAttribute('disabled', 'disabled'));
		sendShortenerRequest()
			.then(() => {
				shortenerSubmitBtn.classList.remove('loader');
				shortenerInputs.forEach((input) => input.removeAttribute('disabled'));
				longLink.value = "";
			});
	};
});


// HTTP Request
const SHORTENER_API = 'api/v1/links';
const qr = document.getElementById('qr');

let shortenerObject = {
	longLink: longLink.value,
};

const ShortenerRequestOptions = {
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json;charset=UTF-8',
	},
	body: JSON.stringify(shortenerObject),
};

async function sendShortenerRequest() {
	try {
		let response = await fetch(SHORTENER_API, ShortenerRequestOptions);
		let json = await response.json();
		shortLink.value = json.name;
		qr.src = `data:image/jpg;base64,${json.qr}`;
	} catch (error) {
		console.error('ошибка при запросе (shortener): ' + error); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
	};
};


export { shortLink };