import router from '../router.js';
import { REFRESH_API, LOGOUT_API, SETTINGS_API } from "./api.js";
import sendRequest from '../utils/sendRequest.js';

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
					await this.sendRequest(...arguments, { token: this.accessToken });
				}
			}
		}

		if (this.isRetry) delete this.isRetry;

		return { response,	json };
	},

	refreshTokens: async function() {
		try {
			let { response,	json } = await sendRequest('POST', REFRESH_API, '', { cookie: true });

			if (!response.ok) {
				await this.logout();
				return false;
			}

			if (json.access) {
				this.accessToken = json.access;
				this.email = json.email;
				return true;
			}
		} catch (e) {}
	},

	logout: async function() {
		try {
			await sendRequest('POST', LOGOUT_API, '', { cookie: true });
			this.accessToken = null;
			this.email = null;
			if (this.isRetry) delete this.isRetry;
			router('#/');
		} catch (e) {}
	},

	delete: async function(reqBody) {
		try {
			let { response,	json } = await this.sendRequest('DELETE', SETTINGS_API, reqBody, { cookie: true });
			if (response.ok) {
				await this.logout();
			} else if(json && json.error) {
				alert(json.error);
			} else alert('Не получилось удалить аккаунт :( \nПожалуйста, попробуйте позже');
		} catch (e) {}
	},
};

export default user;