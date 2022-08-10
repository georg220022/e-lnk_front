import router from '../router.js';

const REFRESH_API = 'api/v1/refresh';
let cookie = document.cookie;
let refreshToken = Boolean(cookie.match('refresh'));

let user = {
	email: null,
	accessToken: null,

	refreshTokens: async function() {
		const refreshTokensRequestOptions = {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
		};

		try {
			if (!refreshToken) {
				this.logout();
				throw (`Нет рефреш токена`); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
			};

			let response = await fetch(REFRESH_API, refreshTokensRequestOptions);

			if (!response.ok) {
				this.logout();
				throw (`Токен не валиден(ответ сервера: ${response.status})`); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
			};

			let json = await response.json();
			console.log('Полученный json (refresh_request):'); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
			console.log(json); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ

			if (json.access) {
				this.accessToken = json.access;
				this.email = json.email;
				return true;
			};
		} catch (error) {
			console.error('ошибка при рефреше (refresh_request): ' + error); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
		};
	},
	
	logout() {
		try {
			this.accessToken = null;
			this.email = null;
			cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			router('#/');
		} catch (error) {
			console.error('ошибка при логауте: ' + error); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
		};
	},
};

export default user;