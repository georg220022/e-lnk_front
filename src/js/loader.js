const body = document.body;
let loader = document.createElement('div');

function showLoader() {
	loader.innerHTML = `<div class="page-loader-wrapper">
												<div class="page-loader"></div>
											</div>`;
	body.classList.add('lock');
	body.appendChild(loader);
};

function hideLoader() {
	body.classList.remove('lock');
	body.removeChild(loader);
};

export {showLoader, hideLoader}