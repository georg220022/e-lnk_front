const linkComponent = (obj, id) => {
	// language=HTML
	return `
    <div class="link-wrapper" data-link-id="${id}">
      <div class="link">
        <ul class="accordion">
          <li class="accordion__item">
            <div class="link__head">
              <button class="accordion__button">
                <span class="link__name">${obj.linkName ? obj.linkName : obj.longLink}</span>
                ${obj.lock ? '<span class="link__locked"><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20px" height="20px"><path d="M 32 9 C 24.832 9 19 14.832 19 22 L 19 27.347656 C 16.670659 28.171862 15 30.388126 15 33 L 15 49 C 15 52.314 17.686 55 21 55 L 43 55 C 46.314 55 49 52.314 49 49 L 49 33 C 49 30.388126 47.329341 28.171862 45 27.347656 L 45 22 C 45 14.832 39.168 9 32 9 z M 32 13 C 36.963 13 41 17.038 41 22 L 41 27 L 23 27 L 23 22 C 23 17.038 27.037 13 32 13 z M 21 31 L 43 31 C 44.105 31 45 31.895 45 33 L 45 49 C 45 50.105 44.105 51 43 51 L 21 51 C 19.895 51 19 50.105 19 49 L 19 33 C 19 31.895 19.895 31 21 31 z"/></svg></span>' : ''}
              </button>
              <div class="link__short form__input-wrapper--short-link">
                <label class="form__label form__label--short-link" for="short-link">
                  <input class="form__input--short-link short-link" id="short-link" type="url" name="shortLink"
                         value="${obj.shortLink}" placeholder="Результат" readonly>
                </label>
                <button class="form__button round-button round-button--copy copy-button">
                  <svg width="21" height="26" viewBox="0 0 21 26" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.8125 0H1.3125C0.964403 0 0.630564 0.136964 0.384422 0.380761C0.138281 0.624558 0 0.955218 0 1.3V16.9C0 17.2448 0.138281 17.5754 0.384422 17.8192C0.630564 18.063 0.964403 18.2 1.3125 18.2H7.875V20.8H10.5V18.2H7.87631V15.6H10.5V13H7.875V15.6H2.625V2.6H10.5V7.8H13.125V1.3C13.125 0.955218 12.9867 0.624558 12.7406 0.380761C12.4944 0.136964 12.1606 0 11.8125 0V0ZM7.875 9.1V10.4H10.5V7.8H9.1875C8.8394 7.8 8.50556 7.93696 8.25942 8.18076C8.01328 8.42456 7.875 8.75522 7.875 9.1ZM13.125 26H15.75V23.4H13.125V26ZM13.125 10.4H15.75V7.8H13.125V10.4ZM7.875 24.7C7.875 25.0448 8.01328 25.3754 8.25942 25.6192C8.50556 25.863 8.8394 26 9.1875 26H10.5V23.4H7.875V24.7ZM19.6875 7.8H18.375V10.4H21V9.1C21 8.75522 20.8617 8.42456 20.6156 8.18076C20.3694 7.93696 20.0356 7.8 19.6875 7.8ZM18.375 26H19.6875C20.0356 26 20.3694 25.863 20.6156 25.6192C20.8617 25.3754 21 25.0448 21 24.7V23.4H18.375V26ZM18.375 15.6H21V13H18.375V15.6ZM18.375 20.8H21V18.2H18.375V20.8Z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="accordion__content">
              <div class="link__body">
                <div class="tabs-wrapper">
                  <ul class="tabs">
                    <div class="link__top-body">
                      <input class="link__long-link" value="${obj.longLink}" readonly>
                      <div class="link__switching-buttons">
                        <li class="tabs__tab">
                          <button class="tabs__button tabs__button--active" data-tab="#tab_1">
                            <div class="tooltip link__tooltip">
                              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                   fill="none"
                                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                   class="feather feather-bar-chart-2">
                                <line x1="18" y1="20" x2="18" y2="10"></line>
                                <line x1="12" y1="20" x2="12" y2="4"></line>
                                <line x1="6" y1="20" x2="6" y2="14"></line>
                              </svg>
                              <p class="tooltip__text">Статистика</p>
                            </div>

                          </button>
                        </li>
                        <li class="tabs__tab">
                          <button class="tabs__button" data-tab="#tab_2">
                            <div class="tooltip link__tooltip">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                   fill="none"
                                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                   class="feather feather-settings">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path
                                  d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                              </svg>
                              <p class="tooltip__text">Настройки</p>
														</div>
                          </button>
                        </li>
                      </div>
                    </div>
                  </ul>
                  <ul class="tabs__content">
                    <li class="tabs__item tabs__item--active" id="tab_1">
                      <div class="link__info">
                        <div class="link__main-info">
                          <div class="link__start">Начало действия: ${obj.linkStartDate}</div>
                          ${obj.linkEndDate !== '-1' ? `<div class="link__end">Конец действия: ${obj.linkEndDate}</div>` : ''}
                          ${obj.linkLimit !== -1 ? `<div class="link__limit">Лимит переходов: ${obj.linkLimit}</div>` : ''}
                          <div class="link__created">Дата создания: ${obj.linkCreatedDate}</div>
                        </div>
                        <div class="link__clicks-info">
                          <div class="link__clicked">Всего кликов: <span>${obj.clicked}</span></div>
                          <div class="link__repeated-clicked">Всего повторных кликов:
                            <span>${obj.repeatedClicked}</span></div>
                          <div class="link__clicked-today">Кликов сегодня: <span>${obj.statistics.clickedToday}</span>
                          </div>
                          <div class="link__repeated-clicked-today">Повторных кликов сегодня:
                            <span>${obj.statistics.reClickedToday}</span></div>
                        </div>
                        <div class="qr-body links__qr">
                          <h2 class="qr-body__qr-title visually-hidden">QR-код вашей ссылки:</h2>
                          <div class="qr-img-wrapper">
                            <img class="qr-body__qr-img qr-img" src="data:image/jpg;base64,${obj.qr}" alt="QR-код">
                          </div>
                        </div>
                      </div>
                      <div class="link__charts">
                        <div class="link__round-charts">
                          <div class="link__round-chart-item link__device-chart">
                            <canvas id="device-chart-${id}"></canvas>
                          </div>
                          <div class="link__round-chart-item link__os-chart">
                            <canvas id="os-chart-${id}"></canvas>
                          </div>
                          <div class="link__round-chart-item link__country-chart">
                            <canvas id="country-chart-${id}"></canvas>
                          </div>
                        </div>
                        <div class="link__line-charts">
                          <div class="tabs-wrapper">
                            <ul class="link__line-charts-buttons tabs">
                              <li class="tabs__tab">
                                <button class="tabs__button tabs__button--active" data-tab="#hours-chart">
                                  <div class="tooltip link__tooltip">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" fill="currentColor"
                                         viewBox="0 0 24 24">
                                      <path
                                        d="M11.92 24.047a11.918 11.918 0 0 0 11.924-11.591 12.066 12.066 0 0 0-.1-1.944l-1.982.27a9.937 9.937 0 1 1-3.98-6.657L14.9 7h7V0l-2.7 2.7a11.922 11.922 0 1 0-7.28 21.347z"/>
                                      <path
                                        d="m7.25 14.433 2.3-1.1.1-.058a2.388 2.388 0 0 0 1.313-2.009l.007-.759A2.509 2.509 0 0 0 8.465 8H7.257A2.239 2.239 0 0 0 4.9 10.327V11h2v-.673c0-.237.031-.327.354-.327h1.211a.5.5 0 0 1 .506.5v.736s-.05.127-.347.325l-2.024.977-.351.16A2.5 2.5 0 0 0 4.9 14.743V17h5.77v-2H6.9v-.229a.985.985 0 0 1 .35-.338zM17.903 17V9h-2v3h-2V8h-2v6h4v3h2z"/>
                                    </svg>
                                    <p class="tooltip__text">Статистика за сутки</p>
                                  </div>
                                </button>
                              </li>
                              <li class="tabs__tab">
                                <button class="tabs__button" data-tab="#days-chart">
                                  <div class="tooltip link__tooltip">
                                    <svg width="22px" height="22px" viewBox="0 0 24 24" fill="currentColor"
                                         xmlns="http://www.w3.org/2000/svg">
                                      <path
                                        d="M9 2a1 1 0 0 1 1 1v1h4V3a1 1 0 1 1 2 0v1h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V3a1 1 0 0 1 1-1zM8 6H5v3h14V6h-3v1a1 1 0 1 1-2 0V6h-4v1a1 1 0 0 1-2 0V6zm11 5H5v8h14v-8z"/>
                                    </svg>
                                    <p class="tooltip__text">Статистика за неделю</p>
                                  </div>
                                </button>
                              </li>
                            </ul>
                            <ul class="tabs__content">
                              <li class="tabs__item tabs__item--active" id="hours-chart">
                                <div class="link__hours-chart link__line-chart-item">
                                  <canvas id="hours-chart-${id}"></canvas>
                                </div>
                              </li>
                              <li class="tabs__item" id="days-chart">
                                <div class="link__days-chart link__line-chart-item">
                                  <canvas id="days-chart-${id}"></canvas>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="tabs__item" id="tab_2">
                      <div class="link__settings">
                        <form class="form link-settings-form" action="#" method="post" autocomplete="off">
                          <div class="form__input-wrapper panel-input-wrapper form__input-wrapper--link-name">
                            <label class="form__label form__label--link-name" for="link-name">
                              <input class="form__input form__input--link-name"
                                     value="${obj.linkName ? obj.linkName : ''}" type="text" name="linkName"
                                     placeholder="Имя ссылки">
                              <span class="error-label"></span>
                            </label>
                            <button class="form__button round-button round-button--clear clear-button" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                   stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                   class="feather feather-x">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                          <div class="form__input-wrapper panel-input-wrapper form__input-wrapper--link-password">
                            <label class="form__label form__label--link-password" for="link-password">
                              <input class="form__input form__input--link-password"
                                     value="${obj.linkPassword ? obj.linkPassword : ''}" type="text" name="linkPassword"
                                     placeholder="Пароль">
                              <span class="error-label"></span>
                            </label>
                            <button class="form__button round-button round-button--clear clear-button" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                   stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                   class="feather feather-x">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                          <button class="form__button button--main link-settings-form-submit-btn" type="submit"
                                  name="submit">Сохранить
                          </button>
                        </form>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <button class="trash-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    </div>
	`;
};

export default linkComponent;