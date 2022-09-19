import user from './buisness/user.js';

import { loadMainPage, loadLoggedMainPage, loadPanelPage, loadSettingsPage } from './pages.js';
import { hidePreloader } from './handlers/preloader.js';

function router(route) {
	switch (route) {
		case '#/':
			document.title = 'E-lnk';
			user.accessToken ? loadLoggedMainPage(user) : loadMainPage();
			break;
		case '#/panel':
			if (user.accessToken) {
				document.title = 'Панель управления | E-lnk';
				loadPanelPage(user);
			} else loadMainPage();
			break;
		case '#/settings':
			if (user.accessToken) {
				document.title = 'Настройки аккаунта | E-lnk';
				loadSettingsPage(user);
			} else loadMainPage();
			break;
	}
}

document.addEventListener('DOMContentLoaded', async () => {
	await user.refreshTokens();
	if (!window.location.hash) window.location.hash = "#/";
	router(window.location.hash);
}, { once: true });

window.addEventListener('hashchange', () => {
	router(window.location.hash);
});

document.addEventListener('readystatechange', () => {
	if (document.readyState === 'complete') {
		hidePreloader();
	}
}, { once: true });

export default router;