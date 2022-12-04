const registrationModalTemplate = () => {
	return `
		<div class="modal" id="registration-modal">
			<div class="modal__body">
				<div class="modal__head">
					<button type="button" class="modal__close-button" aria-label="Закрыть модальное окно"></button>
				</div>
				<div class="modal__content" id="registration-section">
					<form class="form" id="registration-form" action="#" method="post" autocomplete="off">
						<label class="form__label form__label--email" for="registration-email">
							<input class="form__input form__input--email" id="registration-email" type="email" name="email" aria-label="E-mail" placeholder="Введите e-mail" required>
							<span class="error-label"></span>
						</label>
						<label class="form__label form__label--password" for="registration-password">
							<input class="form__input form__input--password" id="registration-password" type="password" name="password" aria-label="Пароль" placeholder="Введите пароль" required/>
							<span class="error-label"></span>
						</label>
						<label class="form__label form__label--repeat-password" for="registration-repeat-password">
							<input class="form__input form__input--repeat-password" id="registration-repeat-password" type="password" name="repeat-password" aria-label="Повторите пароль" placeholder="Повторите пароль" required/>
							<span class="error-label"></span>
						</label>
						<div class="form__checkbox-wrapper">
						<input class="form__input form__input--checkbox" type="checkbox" name="consent-checkbox" id="registration-consent-checkbox" aria-label="Согласен с условиями пользрвательского соглашения" value="consent-checkbox" required>
						<span class="error-label"></span>
						<label class="form__label form__label--checkbox" for="registration-consent-checkbox">Принимаю <a class="form__terms-link" href="terms.html" target="_blank">условия пользовательского соглашения</a>
						</label>
						</div>
						<button class="form__button form__button--submit button--main" id="registration-submitBtn" type="submit" name="submit">Зарегистрироваться</button>
					</form>
				</div>
			</div>
		</div>
	`;
};

export default registrationModalTemplate;




