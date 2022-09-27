import user from './buisness/user.js';

import { loadMainPage, loadLoggedMainPage, loadPanelPage, loadSettingsPage } from './pages.js';
import { hidePreloader } from './handlers/preloader.js';

function router(route) {
	if (!user.accessToken) {
		document.title = 'E-lnk';
		window.location.hash = "#/";
		loadMainPage();
	} else {
		switch (route) {
			case '#/':
				document.title = 'E-lnk';
				loadLoggedMainPage(user);
			break;
			case '#/panel':
				document.title = 'Панель управления | E-lnk';
				loadPanelPage(user);
			break;
			case '#/settings':
				document.title = 'Настройки аккаунта | E-lnk';
				loadSettingsPage(user);
			break;
		}
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