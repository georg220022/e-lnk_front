import copyTextToClipboard from '../utils/copyTextToClipboard.js';

function copyToClipboardEvent(event) {
	if (event.target.closest('.copy-button')) {
		event.preventDefault();
		event.target.closest('.copy-button').classList.add('checkmark');

		copyTextToClipboard(event.target.closest('.form__input-wrapper').querySelector('input').value)
			.then(() => setTimeout(() => event.target.closest('.copy-button').classList.remove('checkmark'), 1000));
	};
};

export default copyToClipboardEvent;