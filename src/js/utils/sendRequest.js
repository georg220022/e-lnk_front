async function sendRequest(method, api, body = '', options = { token: false, cookie: false }) {
	let { token, cookie } = options;

	const requestOptions = {
		method: method,
		credentials: 'omit',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
		},
	};

	if (method !== 'GET') requestOptions.body = body;
	if (token) requestOptions.headers['Authorization'] = `Bearer ${token}`;
	if (cookie) requestOptions.credentials = 'include';

	let response = null;
	let json = null;

	try {
		response = await fetch(api, requestOptions);
		try {
			json = await response.json();
		} catch (e) {}
	} catch (e) {}

	return { response, json	};
}

export default sendRequest;