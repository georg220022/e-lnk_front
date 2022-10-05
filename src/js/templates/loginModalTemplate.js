const loginModalTemplate = () => {
	return `
		<div class="modal" id="login-modal">
			<div class="modal__body">
				<div class="modal__head">
					<button class="modal__close-button"></button>
				</div>
				<div class="modal__content" id="login-section">
					<form class="form" id="login-form" action="#" method="post" autocomplete="off">
						<label class="form__label form__label--email" for="login-email">
							<input class="form__input form__input--email" id="login-email" type="email" name="email" placeholder="Введите e-mail" required>
							<span class="error-label"></span>
						</label>
						<label class="form__label form__label--password" for="login-password">
							<input class="form__input form__input--password" id="login-password" type="password" name="password" placeholder="Введите пароль" required/>
							<span class="error-label"></span>
						</label>
						<button class="link-button forget-password-button" type="button">Забыли пароль?</button>
						<button class="form__button form__button-login form__button--submit button--main" id="login-submitBtn" type="submit" name="submit">Войти</button>
					</form>
					<form class="form" id="reset-password-form" action="#" method="post" autocomplete="off" style="display: none">
						<button class="link-button back-button" type="button">Назад</button>
						<p class="reset-form-text">Введите почту на которую зарегестрирован ваш аккаунт. На нее придет ссылка для сброса пароля.</p>
						<label class="form__label form__label-reset-password--email" for="reset-password-email">
							<input class="form__input form__input--reset-password-email" id="reset-password-email" type="email" name="email" placeholder="Введите e-mail" required>
							<span class="error-label"></span>
						</label>
						<button class="form__button form__button--reset-password form__button--submit button--main" id="reset-password-form-submitBtn" type="submit" name="submit">Отправить</button>
					</form>
				</div>
			</div>
		</div>
	`;
};

export default loginModalTemplate;




