if (!document.cookie.match('cookie-consent=true')) {

	const cookieElem = document.createElement('div');
	cookieElem.innerHTML = `
		<div class="cookie-consent">
			<div class="cookie-consent__body">
				<p class="cookie-consent__text">Мы используем cookies</p>
				<button class="cookie-consent__button button--main">Хорошо</button>
			</div>
		</div>
	`;

	const cookieTimeout = setTimeout(() => {
		document.body.append(cookieElem);
		const cookieBtn = document.querySelector('.cookie-consent__button');
		cookieBtn.addEventListener('click', hideCookieElem, {once: true});
		clearTimeout(cookieTimeout);
	}, 2000);

	function hideCookieElem() {
		document.cookie = 'cookie-consent=true; path=/; expires=Wen, 28 May 2098 00:28:00 GMT';
		document.body.removeChild(cookieElem);
	}
}





