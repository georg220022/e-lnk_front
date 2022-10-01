const paginationTemplate = (paginationLinkComponent) => {
  return `
    <nav class="pagination">
      <ul class="pagination__list">
        <li class="pagination__item"><a class="pagination__link pagination__link--prev disabled" href="#" data-page-link="prev"><</a></li>
          ${paginationLinkComponent}
        <li class="pagination__item"><a class="pagination__link pagination__link--next" href="#" data-page-link="next">></a></li>
      </ul>
    </nav>
  `;
};

const paginationLinkTemplate = (pageNum) => {
  return `
    <li class="pagination__item"><a class="pagination__link" href="#" data-page-link="${pageNum}">${pageNum}</a></li>
  `;
};

export { paginationTemplate, paginationLinkTemplate };
