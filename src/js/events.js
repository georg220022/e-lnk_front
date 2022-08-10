import user from './buisness/user.js'
import { copyTextToClipboard } from './utils.js'

const bodySelector = '#body-section';

const logoutLinkSelector = '.logout-link';

const dropdownButtonSelector = '.dropdown__button';

const burgerSelector = '.burger';
const burgerMenuSelector = '.header__nav';
const burgerBtnSelector = '.nav__button';

const modalBtnSelector = '.modal-button';

const copyBtnSelector = 'copy-button';

document.addEventListener('click', (event) => {

	// logout 
	if (event.target.closest(logoutLinkSelector)) {
		user.logout();
	};

	// dropdown
	if (event.target.closest(dropdownButtonSelector)) {
		event.target.nextElementSibling.classList.toggle('dropdown__list--visible');
	};

	if (event.target.closest(bodySelector) && !event.target.matches(dropdownButtonSelector)) {
		document.body.querySelector(dropdownButtonSelector)?.nextElementSibling.classList.remove('dropdown__list--visible');
	};

	// burger menu
	if (event.target.closest(burgerSelector)) {
		event.target.classList.toggle('burger--active');
		document.querySelector(burgerMenuSelector)?.classList.toggle('burger-menu--active');
		document.body.classList.toggle('burger-menu-overlay');
	};

	if (event.target.closest(burgerBtnSelector) && document.querySelector(burgerSelector)?.classList.contains('burger--active')) {
		document.querySelector(burgerSelector)?.classList.remove('burger--active');
		document.querySelector(burgerMenuSelector)?.classList.remove('burger-menu--active');
		document.body.classList.remove('burger-menu-overlay');
	};

	if (event.target.closest(bodySelector) && !event.target.matches(burgerSelector) && !event.target.closest('.burger-menu--active')) {
		document.querySelector(burgerSelector)?.classList.remove('burger--active');
		document.querySelector(burgerMenuSelector)?.classList.remove('burger-menu--active');
		document.body.classList.remove('burger-menu-overlay');
	};

	// modals
	if (event.target.closest(bodySelector) && document.querySelector('.modal--open') && !event.target.closest('.modal__body')) {
		document.querySelector('.modal--open').classList.remove('modal--open');
		document.body.classList.remove('lock');
	};

	if (event.target.closest(modalBtnSelector)) {
		let currentModalID = event.target.getAttribute('data-target');
		let currentModal = document.getElementById(currentModalID);

		currentModal?.classList.add('modal--open');
		document.body.classList.add('lock');
	};

	if (event.target.closest('.modal__close-button')) {
		document.querySelector('.modal--open').classList.remove('modal--open');
		document.body.classList.remove('lock');
	};

	// copy to clipboard
	if (event.target.closest(copyBtnSelector)) {
		event.target.classList.add('checkmark');
		copyTextToClipboard(event.target.closest('form__input-wrapper--short-link').querySelector('short-link').value)
			.then(() => setTimeout(() => event.target.classList.remove('checkmark'), 1000));
	};


});

// preloader
const preloader = document.getElementById('preloader');

function showPreloader() {
	if (preloader?.classList.contains('preloader--hide')) {
		preloader.style.display = 'flex';
		preloader?.classList.remove('preloader--hide');
	}
};

function hidePreloader() {
	preloader?.classList.add('preloader--hide');
	setTimeout(() => preloader.style.display = 'none', 1000);
};

export { showPreloader, hidePreloader };
