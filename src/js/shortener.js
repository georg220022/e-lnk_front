// Shortener Form Validation
const shortener = document.getElementById('shortener-form');
const shortenerSubmitBtn = document.getElementById('shortener-submitBtn');
const longLink = document.getElementById('long-link');
const shortLink = document.getElementById('short-link');

const linkRegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

let shortenerInputs = shortener.querySelectorAll('input');
let shortenerErrors = 0;

shortener.setAttribute('novalidate', true);

function validateShortenerFilledInput(input) {
	switch (input.name) {
		case ('longLink'):
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
		input.addEventListener('blur', () => validateShortenerFilledInput(input));
		input.addEventListener('input', () => validateShortenerFilledInput(input));
	};
});

shortener.addEventListener('submit', function(event) {
	event.preventDefault();
	let isValid = false;

	shortenerInputs.forEach(input => {
		if (input != shortLink) {
			isValid = validateShortenerFilledInput(input) && validateEmptyInput(longLink);
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


// Shortener HTTP Request(POST)
const SHORTENER_API = 'api/v1/links';
const qr = document.getElementById('qr');

let shortenerObject = {
	longLink: longLink.value,
};

const shortenerRequestOptions = {
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json;charset=UTF-8',
	},
	body: JSON.stringify(shortenerObject),
};

async function sendShortenerRequest() {
	try {
		let response = await fetch(SHORTENER_API, shortenerRequestOptions);
		let json = await response.json();
		console.log(`Полученный json (shortener): ${json}`); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
		shortLink.value = json.shortLink;
		qr.src = `data:image/jpg;base64,${json.qr}`;
	} catch (error) {
		console.error('ошибка при запросе (shortener): ' + error); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
	};
};


export { shortLink };


