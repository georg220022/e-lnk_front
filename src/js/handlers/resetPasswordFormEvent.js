function resetPasswordFormEvent (event) {
	if (event.target.closest('.forget-password-button')) {
		event.target.closest('form').style.display = 'none';
		event.target.closest('form').nextElementSibling.style.display = 'block';
	}

	if (event.target.closest('.back-button')) {
		event.target.closest('form').style.display = 'none';
		event.target.closest('form').previousElementSibling.style.display = 'block';
	}
}

export default resetPasswordFormEvent;