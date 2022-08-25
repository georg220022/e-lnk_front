import router from '../router.js';
import sendRequest from '../utils/sendRequest.js';

const REFRESH_API = 'api/v1/refresh';
const LOGOUT_API = 'api/v1/logout';


let user = {
	email: null,
	accessToken: null,

	sendRequest: async function(method, api, body) {
		let { response,	json } = await sendRequest(method, api, body, { token: this.accessToken });

		if (this.accessToken) {
			if (response.status === 401 && !this.isRetry) {
				this.isRetry = true;
				let refreshIsValid = await this.refreshTokens();
				if (refreshIsValid) {
					let { response,	json } = await this.sendRequest(...arguments, { token: this.accessToken });
				};
			};
		};

		if (this.isRetry) delete this.isRetry;
		return { response,	json };
	},

	refreshTokens: async function() {
		try {
			let { response,	json } = await sendRequest('POST', REFRESH_API, '', { cookie: true });

			if (!response.ok) {
				this.logout();
				console.error(`Токен не валиден(ответ сервера: ${response.status})`); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
				return false;
			};

			if (json.access) {
				this.accessToken = json.access;
				this.email = json.email;
				return true;
			};
		} catch (error) {
			console.error('ошибка при рефреше (refresh_request): ' + error); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
		};
	},
	
	logout: async function() {
		try {
			await sendRequest('POST', LOGOUT_API, '', { cookie: true });
			this.accessToken = null;
			this.email = null;
			if (this.isRetry) delete this.isRetry;
			router('#/');
		} catch (error) {
			console.error('ошибка при логауте: ' + error); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
		};
	},
};

export default user;