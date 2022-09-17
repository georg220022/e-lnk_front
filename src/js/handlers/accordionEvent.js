function accordionEvent(event) {
  if (event.target.closest('.accordion__button')) {
    let accContent = event.target.closest('.accordion').querySelector('.accordion__content');

    if (!event.target.closest('.accordion__button').classList.contains('accordion__button--active-link')) {
      event.target.closest('.accordion__button').classList.toggle('accordion__button--active');
    }

    if (event.target.closest('.accordion__button').classList.contains('accordion__button--active')) {
      accContent.classList.add('accordion__content--active');
    } else {
      accContent.classList.remove('accordion__content--active');
    }
  }
}

export default accordionEvent;