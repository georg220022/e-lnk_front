import user from './user.js';
import validateEmptyInput from '../utils/validateEmptyInput.js';
import validateShortenerFilledInput from '../utils/validateShortenerFilledInput.js';
import createObjectFromInputs from '../utils/createObjectFromInputs.js';
import ruDateStringToISOString from '../utils/ruDateStringToISOString.js';

const SHORTENER_API = 'api/v1/links';

let shortenerVars = {}; 
let s = shortenerVars;

function enableShortener() {
	s.shortenerSubmitBtn = document.getElementById('shortener-submitBtn');
	s.longLink = document.getElementById('long-link');
	s.shortLink = document.getElementById('short-link');
	s.heroBody = document.querySelector('.hero__content');
	s.shortLinkWrapper = document.querySelector('.form__input-wrapper--short-link');
	s.qr = document.getElementById('qr');
	s.qrWrapper = document.querySelector('.qr-body');

	s.shortenerInputs?.forEach(input => {
		input.removeEventListener('blur', () => validateShortenerFilledInput(input));
		input.removeEventListener('input', () => validateShortenerFilledInput(input));
	});
	s.shortener?.removeEventListener('submit', submitShortener);

	s.shortener = document.getElementById('shortener-form');
	s.allShortenerFields = s.shortener.querySelectorAll('input');
	s.shortenerInputs = Array.from(s.allShortenerFields).slice(0, -1);
	s.shortener.setAttribute('novalidate', true);

	s.shortenerInputs?.forEach(input => {
		input.addEventListener('blur', () => validateShortenerFilledInput(input));
		input.addEventListener('input', () => validateShortenerFilledInput(input));
	});
	s.shortener?.addEventListener('submit', submitShortener);
}


async function submitShortener(event) {
	event.preventDefault();

	let isValid = false;

	let validatedInputs = s.shortenerInputs.map(input => {
		return validateShortenerFilledInput(input);
	});

	isValid = validatedInputs.every(input => input === true) && validateEmptyInput(s.longLink);

	if (isValid) {
		let objFromInputs = createObjectFromInputs(s.shortenerInputs, 'input.value');
		if (objFromInputs.linkLimit) objFromInputs.linkLimit = +objFromInputs.linkLimit;
		if (objFromInputs.linkStartDate) objFromInputs.linkStartDate = ruDateStringToISOString(objFromInputs.linkStartDate);
		if (objFromInputs.linkEndDate) objFromInputs.linkEndDate = ruDateStringToISOString(objFromInputs.linkEndDate);
		let jsonForReq = JSON.stringify(objFromInputs);

		s.shortenerSubmitBtn.classList.add('loader');
		s.allShortenerFields.forEach(input => input.setAttribute('disabled', 'disabled'));

		let { json } = await user.sendRequest('POST', SHORTENER_API, jsonForReq);

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
		s.allShortenerFields.forEach(input => input.removeAttribute('disabled'));
		s.shortenerInputs.forEach(input => input.value = '');
	}
}

export default enableShortener;