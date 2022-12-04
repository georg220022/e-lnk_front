const settingsTemplate = (userData) => {
	return `
		<div class="settings">
			${!userData.isActivated ? `
				<div class="settings__item">
					<ul class="accordion">
						<li class="accordion__item error-acc-item">
							<button class="accordion__button accordion__button--active" disabled>
								<div class="accordion__header error-acc-item">
									<h3 class="accordion__title">Активация аккаунта</h3>
								</div>
							</button>
							<div class="accordion__content accordion__content--active">
								<form class="form settings-send-email-again-form" action="#" method="post" autocomplete="off" novalidate>
									<p class="settings__label">Ваш адрес электронной почты не подтвержден. Перейдите по ссылке в письме активации, которое было направлено на Вашу почту
										<span class="accent-text">${userData.email}</span>.
									</p>
									<p class="settings__label">Если Вы не получали письмо с просьбой подтвердить аккаунт, можно отправить повторный запрос, нажав кнопку ниже.
									</p>
									<button class="form__button form__button--submit button--main"
													type="submit" name="submit">Выслать письмо активации повторно
									</button>
								</form>
							</div>
						</li>
					</ul>
				</div>
			` : ''}
			<div class="settings__item">
				<ul class="accordion">
					<li class="accordion__item">
						<button type="button" class="accordion__button">
							<div class="accordion__header">
								<h3 class="accordion__title">Изменить почту</h3>
							</div>
						</button>
						<div class="accordion__content">
							<form class="form settings-new-email-form" action="#" method="post" autocomplete="off" novalidate>
								<div class="settings__label">При смене электронной почты, вам будет отправлена ссылка активации аккаунта.
								</div>
								<label class="form__label form__label--email" for="login-email">
									<input class="form__input form__input--email" id="login-email" type="email" name="email" aria-label="E-mail"
												 placeholder="Введите новый e-mail" required>
									<span class="error-label"></span>
								</label>
								<label class="form__label form__label--password">
									<input class="form__input form__input--password" type="password" name="password" aria-label="Подтвердите ваш пароль"
												 placeholder="Подтвердите ваш пароль" required/>
									<span class="error-label"></span>
								</label>
								<button class="form__button form__button--submit button--main"
												type="submit" name="submit">Изменить
								</button>
							</form>
						</div>
					</li>
				</ul>
			</div>
		
			<div class="settings__item">
				<ul class="accordion">
					<li class="accordion__item">
						<button type="button" class="accordion__button">
							<div class="accordion__header">
								<h3 class="accordion__title">Изменить пароль</h3>
							</div>
						</button>
						<div class="accordion__content">
							<form class="form settings-new-password-form" action="#" method="post" autocomplete="off" novalidate>
								<label class="form__label form__label--password">
									<input class="form__input form__input--password" type="password" name="password" aria-label="Новый пароль"
												 placeholder="Введите новый пароль" required/>
									<span class="error-label"></span>
								</label>
								<label class="form__label form__label--repeat-password divider">
									<input class="form__input form__input--repeat-password" type="password" name="repeat-password" aria-label="Повторите пароль"
												 placeholder="Повторите новый пароль" required/>
									<span class="error-label"></span>
								</label>
								<label class="form__label form__label--password">
									<input class="form__input form__input--password" type="password" name="password" aria-label="Подтвердите ваш текущий пароль"
												 placeholder="Подтвердите ваш текущий пароль" required/>
									<span class="error-label"></span>
								</label>
								<button class="form__button form__button--submit button--main"
												type="submit" name="submit">Изменить
								</button>
							</form>
						</div>
					</li>
				</ul>
			</div>
		
			<div class="settings__item">
				<ul class="accordion">
					<li class="accordion__item">
						<button type="button" class="accordion__button">
							<div class="accordion__header"><h3 class="accordion__title">Изменить часовой пояс</h3></div>
						</button>
						<div class="accordion__content">
							<form class="form settings-timezone-form" action="#" method="post" autocomplete="off" novalidate>
								<label class="settings__label">Выберите Ваш часовой пояс:
									<div class="tooltip">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
												 stroke="#3d96e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
												 class="feather feather-help-circle">
											<circle cx="12" cy="12" r="10"></circle>
											<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
											<line x1="12" y1="17" x2="12.01" y2="17"></line>
										</svg>
										<p class="tooltip__text">Ваше региональное смещение UTC определяется автоматически при регистрации.
											Если Вы&nbsp;переезжаете в&nbsp;другой часовой пояс, то&nbsp;для корректной статистики необходимо
											выставить новое смещение UTC. <span class="error-text">Обращаем Ваше внимание, что в&nbsp;этом случае вся статистика за&nbsp;текущий день будет удалена.</span>
										</p>
									</div>
								</label>
		
								<div class="select">
									<div class="select__header">
										<div class="select__item--current">${userData.timezone}</div>
										<label>
											<select name="timezone" aria-hidden="true">
												<option value="${userData.timezone}"></option>
											</select>
										</label>
									</div>
									<ul class="select__body">
										<li class="select__item">-12</li>
										<li class="select__item">-11</li>
										<li class="select__item">-10</li>
										<li class="select__item">-9</li>
										<li class="select__item">-8</li>
										<li class="select__item">-7</li>
										<li class="select__item">-6</li>
										<li class="select__item">-5</li>
										<li class="select__item">-4</li>
										<li class="select__item">-3</li>
										<li class="select__item">-2</li>
										<li class="select__item">-1</li>
										<li class="select__item">+0</li>
										<li class="select__item">+1</li>
										<li class="select__item">+2</li>
										<li class="select__item">+3</li>
										<li class="select__item">+4</li>
										<li class="select__item">+5</li>
										<li class="select__item">+6</li>
										<li class="select__item">+7</li>
										<li class="select__item">+8</li>
										<li class="select__item">+9</li>
										<li class="select__item">+10</li>
										<li class="select__item">+11</li>
										<li class="select__item">+12</li>
									</ul>
								</div>
								<label class="form__label form__label--password">
									<input class="form__input form__input--password" type="password" name="password" aria-label="Подтвердите ваш пароль"
												 placeholder="Подтвердите ваш пароль" required/>
									<span class="error-label"></span>
								</label>
								<button class="form__button form__button--submit button--main"
												type="submit" name="submit">Изменить
								</button>
							</form>
						</div>
					</li>
				</ul>
			</div>
			
			<div class="settings__item">
				<ul class="accordion">
					<li class="accordion__item">
						<button type="button" class="accordion__button">
							<div class="accordion__header"><h3 class="accordion__title">Изменить отправку статистики</h3></div>
						</button>
						<div class="accordion__content">
							<form class="form settings-statistics-form" action="#" method="post" autocomplete="off" novalidate>
								<label>Отправлять ежедневную статистику на почту?</label>
								<div class="select">
									<div class="select__header">
										<div class="select__item--current">${userData.sendStat ? 'Да' : 'Нет'}</div>
										<label>
											<select name="sendStat" aria-hidden="true">
												<option value="${userData.sendStat ? 'Да' : 'Нет'}"></option>
											</select>
										</label>
									</div>
									<ul class="select__body">
										<li class="select__item">Да</li>
										<li class="select__item">Нет</li>
									</ul>
								</div>
								<label class="form__label form__label--password">
									<input class="form__input form__input--password" type="password" name="password" aria-label="Подтвердите ваш пароль"
												 placeholder="Подтвердите ваш пароль" required/>
									<span class="error-label"></span>
								</label>
								<button class="form__button form__button--submit button--main" id="settings-email-form-submitBtn"
												type="submit" name="submit">Изменить
								</button>
							</form>
						</div>
					</li>
				</ul>
			</div>
		
			<div class="settings__item">
				<ul class="accordion">
					<li class="accordion__item error-acc-item">
						<button type="button" class="accordion__button">
							<div class="accordion__header error-acc-item"><h3 class="accordion__title">Удалить аккаунт</h3></div>
						</button>
						<div class="accordion__content">
							<form class="form settings-delete-acc-form" action="#" method="post" autocomplete="off" novalidate>
								<label class="form__label form__label--password">
									<input class="form__input form__input--password error-input" type="password" name="password" aria-label="Подтвердите ваш пароль"
												 placeholder="Подтвердите ваш пароль" required/>
									<span class="error-label"></span>
								</label>
								<button class="form__button form__button--submit button--main error-button"
												id="settings-password-form-submitBtn" type="submit" name="submit">Удалить
								</button>
							</form>
						</div>
					</li>
				</ul>
			</div>
		</div>
  `;
};

export default settingsTemplate;