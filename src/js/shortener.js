// Shortener Form Validation
const shortener = document.getElementById('shortener-form');
const shortenerSubmitBtn = document.getElementById('shortener-submitBtn');
const longLink = document.getElementById('long-link');
const shortLink = document.getElementById('short-link');
const shortLinkWrapper = document.querySelector('.form__input-wrapper--short-link');
const qrWrapper = document.querySelector('.hero__qr-body');


const linkRegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

let shortenerInputs = shortener.querySelectorAll('input');

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
				if (shortLink.value) {
					shortLinkWrapper.classList.add('open');
					qrWrapper.classList.add('open');
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
		if (input != shortLink && input.value) {
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
		if (response.status === 404) { 
			alert('Не получилось сократить ссылку :( \nПожалуйста, попробуйте позже');
			console.log(response); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
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
		console.error('ошибка при запросе (shortener): ' + error); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
	};
};

export { shortLink };