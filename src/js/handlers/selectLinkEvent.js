function selectLinkEvent(event) {

	if (event.target.closest('.trash-button')) {
		event.target.closest('.trash-button').classList.add('trash-button--active');
		event.target.closest('.link-wrapper').classList.add('link--active');
		event.target.closest('.link-wrapper').querySelector('.accordion__button').className = 'accordion__button accordion__button--active-link';
		event.target.closest('.link-wrapper').querySelector('.accordion__content').classList.remove('accordion__content--active');
		document.querySelector('.panel__controls').classList.add('open');
	};

	if (event.target.closest('.controls__button--cancel') || event.target.closest('.pagination__link')) {
		let trashBtns = document.querySelectorAll('.trash-button');
		let links = document.querySelectorAll('.link-wrapper');
		let accBtns = document.querySelectorAll('.accordion__button');

		trashBtns.forEach(btn => btn.classList.remove('trash-button--active'));
		links.forEach(link => link.classList.remove('link--active'));
		accBtns.forEach(btn => btn.classList.remove('accordion__button--active-link'));
		document.querySelector('.panel__controls').classList.remove('open');
	};
};

export default selectLinkEvent;