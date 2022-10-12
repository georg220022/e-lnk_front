function selectEvent(event) {
	if (document.querySelector('.select--active') &&
		!event.target.closest('.select__header')) {
		let selects = document.body.querySelectorAll('.select');
		if (selects) selects.forEach(select => select.classList.remove('select--active'));
	}

	if (event.target.closest('.select__header')) {
		event.target.closest('.select').classList.toggle('select--active');
	}

	if (event.target.closest('.select__item')) {
		const currentItem = event.target.closest('.select__item');
		const currentSelect = event.target.closest('.select');
		currentSelect.classList.remove('select--active');
		currentSelect.querySelector('.select__item--current').innerText = currentItem.innerText;
		currentSelect.querySelector('option').value = currentItem.innerText;
	}
}

export default selectEvent;
