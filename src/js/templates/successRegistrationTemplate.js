const successRegistrationTemplate = (email) => {
	return `
		<div class="success-registration">
			<h2 class="success-registration__title">Вы успешно зарегистрированы!</h2>
			<p class="success-registration__text">Чтобы начать пользоваться сервисом, перейдите по&nbsp;ссылке из&nbsp;письма в&nbsp;вашем почтовом ящике 
				<span class="success-registration__email">${email}</span>
			</p>
			<p class="success-registration__ps">В&nbsp;редких случаях письмо может идти до&nbsp;15&nbsp;минут.</p>
			<p class="success-registration__ps">Если письмо не&nbsp;пришло обратитесь в&nbsp;поддержку: help@e-lnk.ru</p>
		</div>
  `;
};

export default successRegistrationTemplate;