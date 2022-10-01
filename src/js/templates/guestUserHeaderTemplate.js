const guestUserHeaderTemplate = () => {
	return `
    <nav class="nav header__nav">
			<ul class="nav__list">
				<li class="nav__item"><button class="nav__button button nav__button--registration modal-button burger-menu-link" data-target="registration-modal">Зарегистрироваться</button></li>
				<li class="nav__item"><button class="nav__button button--main modal-button burger-menu-link" data-target="login-modal">Войти</button></li>
			</ul>
    </nav>
		<button class="burger">
      <span class="burger__line"></span>
    </button>
  `;
};

export default guestUserHeaderTemplate;