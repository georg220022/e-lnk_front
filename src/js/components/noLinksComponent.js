const noLinksComponent = () => {
	return `
		<div class="panel flex">
			<div class="panel__no-links no-links">
				<p class="no-links__text"> У вас пока нет ссылок</p>
				<a href="#/" class="no-links__button button--main">Добавить</a>
			</div>
		</div>
  `;
};

export default noLinksComponent;