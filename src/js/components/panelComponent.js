const panelComponent = () => {
	return `
		<div class="panel">
			<div class="panel__header">
				<div class="panel__header-body">
					<div class="panel__sort sort">
						Сортировать:
						<button class="sort__button">По дате добавления</button>
					</div>
					<div class="panel__controls controls">
						<button class="controls__button controls__button--cancel button">Отмена</button>
						<button class="controls__button controls__button--delete button">Удалить отмеченные</button>
					</div>
					</div>
			</div>
			<div class="panel__body" id="links-section"></div>
			<div class="panel__pagination" id="pagination-section"></div>
		</div>
  `;
};

export default panelComponent;