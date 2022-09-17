import user from './buisness/user.js';
import PageSection from './utils/PageSection.js';

import guestUserHeaderComponent from './components/guestUserHeaderComponent.js';
import shortenerComponent from './components/shortenerComponent.js';
import benefitsComponent from './components/benefitsComponent.js';

import loggedUserHeaderComponent from './components/loggedUserHeaderComponent.js';
import extendedShortenerComponent from './components/extendedShortenerComponent.js';

import loginModalComponent from './components/loginModalComponent.js';
import registrationModalComponent from './components/registrationModalComponent.js';

import enableShortener from './buisness/shortener.js';
import enableDatepicker from './handlers/datepicker.js';
import enableLoginForm from './buisness/login.js';
import enableRegistrationForm from './buisness/registration.js';
import enablePanel from './buisness/panel.js';

const userHeaderSection = new PageSection('user-header-section');
const mainSection = new PageSection('main-section');
const modalsSection = new PageSection('modals-section');
const additionalSection = new PageSection('additional-section');

function LoadMainPage() {
	if (user.accessToken) {
		userHeaderSection.renderComponent(loggedUserHeaderComponent(user));
		mainSection.renderComponent(extendedShortenerComponent());
		modalsSection.renderComponent('');
		additionalSection.renderComponent('');
		enableDatepicker();
	} else {
		userHeaderSection.renderComponent(guestUserHeaderComponent());
		mainSection.renderComponent(shortenerComponent());
		modalsSection.renderComponent(loginModalComponent() + registrationModalComponent());
		additionalSection.renderComponent(benefitsComponent());
		enableLoginForm();
		enableRegistrationForm();
	}

	enableShortener();
}

function LoadPanelPage() {
	if (user.accessToken) {
		userHeaderSection.renderComponent(loggedUserHeaderComponent(user, ''));
		enablePanel();
	} else {
		LoadMainPage();
	}
}

function LoadSettingsPage() {
	if (user.accessToken) {
		userHeaderSection.renderComponent(loggedUserHeaderComponent(user, '<li class="nav__item"><a class="button--main" href="#/panel">Панель управления</a></li>', ''));
		mainSection.renderComponent('<h2>Настройки аккаунта</h2>');
	} else {
		LoadMainPage();
	}
}

export { LoadMainPage, LoadPanelPage, LoadSettingsPage };