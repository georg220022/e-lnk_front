import user from './buisness/user.js';
import { PageSection } from './utils.js';

import guestUserHeaderComponent from './components/guestUserHeaderComponent.js';
import shortenerComponent from './components/shortenerComponent.js';
import benefitsComponent from './components/benefitsComponent.js';

import loggedUserHeaderComponent from './components/loggedUserHeaderComponent.js';
import extendedShortenerComponent from './components/extendedShortenerComponent.js';

import loginModalComponent from './components/loginModalComponent.js';
import registrationModalComponent from './components/registrationModalComponent.js';

const userHeaderSection = new PageSection('user-header-section');
const heroSection = new PageSection('hero-section');
const modalsSection = new PageSection('modals-section');
const additionalSection = new PageSection('additional-section');

async function LoadMainPage() {
	if (user.accessToken) {
		userHeaderSection.renderComponent(loggedUserHeaderComponent(user));
		heroSection.renderComponent(extendedShortenerComponent());
	} else {
		userHeaderSection.renderComponent(guestUserHeaderComponent());
		heroSection.renderComponent(shortenerComponent());
		modalsSection.renderComponent(loginModalComponent() + registrationModalComponent());
		additionalSection.renderComponent(benefitsComponent());
	};
};

async function LoadPanelPage() {
	if (user.accessToken) {
		userHeaderSection.renderComponent(loggedUserHeaderComponent(user, ''));
		heroSection.renderComponent('<h2>Панель управления</h2>');
	} else {
		LoadMainPage();
	};
};

async function LoadSettingsPage() {
	if (user.accessToken) {
		userHeaderSection.renderComponent(loggedUserHeaderComponent(user, '<li class="nav__item"><a class="button--main" href="#/panel">Панель управления</a></li>', ''));
		heroSection.renderComponent('<h2>Настройки аккаунта</h2>');
	} else {
		LoadMainPage();
	};
};

export { LoadMainPage, LoadPanelPage, LoadSettingsPage };