function clearInputEvent(event) {
	if (event.target.closest('.clear-button')) {
		event.preventDefault();
		event.target.closest('.form__input-wrapper').querySelector('input').value = '';
	}
}

export default clearInputEvent;