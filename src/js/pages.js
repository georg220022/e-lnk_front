import PageSection from './utils/PageSection.js';

import guestUserHeaderTemplate from './templates/guestUserHeaderTemplate.js';
import shortenerTemplate from './templates/shortenerTemplate.js';
import benefitsTemplate from './templates/benefitsTemplate.js';

import loggedUserHeaderTemplate from './templates/loggedUserHeaderTemplate.js';
import extendedShortenerTemplate from './templates/extendedShortenerTemplate.js';

import loginModalTemplate from './templates/loginModalTemplate.js';
import registrationModalTemplate from './templates/registrationModalTemplate.js';

import enableShortener from './buisness/shortener.js';
import enableDatepicker from './handlers/datepicker.js';
import enableLoginForm from './buisness/login.js';
import enableRegistrationForm from './buisness/registration.js';
import enablePanel from './buisness/panel.js';
import enableSettings from './buisness/settings';

const userHeaderSection = new PageSection('user-header-section');
const mainSection = new PageSection('main-section');
const modalsSection = new PageSection('modals-section');
const additionalSection = new PageSection('additional-section');

function loadMainPage() {
	userHeaderSection.render(guestUserHeaderTemplate());
	mainSection.render(shortenerTemplate());
	modalsSection.render(loginModalTemplate() + registrationModalTemplate());
	additionalSection.render(benefitsTemplate());
	enableShortener();
	enableLoginForm();
	enableRegistrationForm();
}

function loadLoggedMainPage(user) {
	userHeaderSection.render(loggedUserHeaderTemplate(user.email));
	mainSection.render(extendedShortenerTemplate());
	modalsSection.render('');
	additionalSection.render('');
	enableShortener();
	enableDatepicker();
}

function loadPanelPage(user) {
	userHeaderSection.render(loggedUserHeaderTemplate(user.email, { panelLink: false, shortenerLink: true }));
	enablePanel();
}

function loadSettingsPage(user) {
	userHeaderSection.render(loggedUserHeaderTemplate(user.email, { settingsLink: false }));
	enableSettings();
}

export { loadMainPage, loadLoggedMainPage, loadPanelPage, loadSettingsPage };