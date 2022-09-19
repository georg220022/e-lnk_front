const loggedUserHeaderComponent = (email, { panelLink = true , settingsLink = true} = {}) => {
	return `
    <nav class="nav header__nav">
      <ul class="nav__list">
        ${panelLink ? '<li class="nav__item "><a class="button--main burger-menu-link" href="#/panel">Панель управления</a></li>' : ''}
        <li class="nav__item">
          <div class="dropdown">
            <a class="dropdown__button nav__link burger-menu-link" href="#">${email ? email : ''}</a>
            <ul class="dropdown__list">
							${settingsLink ? '<li><a class="dropdown__link burger-menu-link" href="#/settings">Настройки</a></li>' : ''}
              <li><a class="dropdown__link logout-link burger-menu-link" href="#">Выйти</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
    <button class="burger">
      <span class="burger__line"></span>
    </button>
  `;
};

export default loggedUserHeaderComponent;

