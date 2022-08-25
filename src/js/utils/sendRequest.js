async function sendRequest(method, api, body, options = { token: false, cookie: false }) {
	let { token, cookie } = options;

	const requestOptions = {
		method: method,
		credentials: 'omit',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
		},
		body: body,
	};

	if (token) {
		requestOptions.headers['Authorization'] = `Bearer ${token}`;
	};

	if (cookie) {
		requestOptions.credentials = 'include';
	};

	let response = null;
	let json = null;

	try {
		response = await fetch(api, requestOptions);
		try {
			json = await response.json();
			console.log(`Полученный json (${api}):`); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
			console.log(json); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
		} catch (e) {};
	} catch (error) {
		console.error(`ошибка при запросе (${api}): ${error}`); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
	};

	return { response, json	};
};

export default sendRequest;