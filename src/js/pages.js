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

function loadMainPage() {
	userHeaderSection.renderComponent(guestUserHeaderComponent());
	mainSection.renderComponent(shortenerComponent());
	modalsSection.renderComponent(loginModalComponent() + registrationModalComponent());
	additionalSection.renderComponent(benefitsComponent());
	enableShortener();
	enableLoginForm();
	enableRegistrationForm();
}

function loadLoggedMainPage(user) {
	userHeaderSection.renderComponent(loggedUserHeaderComponent(user.email));
	mainSection.renderComponent(extendedShortenerComponent());
	modalsSection.renderComponent('');
	additionalSection.renderComponent('');
	enableShortener();
	enableDatepicker();
}

function loadPanelPage(user) {
	userHeaderSection.renderComponent(loggedUserHeaderComponent(user.email, { panelLink: false, shortenerLink: true }));
	enablePanel();
}

function loadSettingsPage(user) {
	userHeaderSection.renderComponent(loggedUserHeaderComponent(user.email, { settingsLink: false }));
	mainSection.renderComponent('<h2>Настройки аккаунта</h2>');
}

export { loadMainPage, loadLoggedMainPage, loadPanelPage, loadSettingsPage };