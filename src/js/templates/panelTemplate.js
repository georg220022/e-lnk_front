const panelTemplate = () => {
	return `
		<div class="panel">
			<div class="panel__header">
				<div class="panel__header-body">
					<div class="panel__sort sort">
						Сортировать:
						<button type="button" class="sort__button" aria-label="Сортировать по дате обновления">По дате добавления</button>
					</div>
					<div class="panel__controls controls">
						<button type="button" class="controls__button controls__button--cancel button" aria-label="Отмена">Отмена</button>
						<button type="button" class="controls__button controls__button--delete button" aria-label="Удалить отмеченные">Удалить отмеченные</button>
					</div>
					</div>
			</div>
			<div class="panel__body" id="links-section"></div>
			<div class="panel__pagination" id="pagination-section"></div>
		</div>
  `;
};

export default panelTemplate;