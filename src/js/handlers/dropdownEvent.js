function dropdownEvent(event) {
	if (event.target.closest('.dropdown__button')) {
		event.target.nextElementSibling.classList.toggle("dropdown__list--visible");
	}

	if (event.target.closest('#body-section') && !event.target.matches('.dropdown__button')) {
		let dropdowns = document.body.querySelectorAll('.dropdown__button');
		if (dropdowns) {
			dropdowns.forEach(dropdown => dropdown.nextElementSibling.classList.remove('dropdown__list--visible'));
		}
	}
}

export default dropdownEvent;