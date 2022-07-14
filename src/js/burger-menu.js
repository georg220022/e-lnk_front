const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.header__nav');
const burgerBtns = document.querySelectorAll('.nav__button');

burger.addEventListener('click', function() {
  burger.classList.toggle('burger--active');
  burgerMenu.classList.toggle('burger-menu--active');
  document.body.classList.toggle('burger-menu-overlay');
});

burgerBtns.forEach(item => {
  item.addEventListener('click', function() {
    if (burger.classList.contains('burger--active')) {
      burger.classList.remove('burger--active');
      burgerMenu.classList.remove('burger-menu--active');
      document.body.classList.remove('burger-menu-overlay');
    };
  });
});

document.body.addEventListener('click', function(event) {
  if (!event.target.matches('.burger') &&
    !event.target.closest('.burger-menu--active')) {
    burger.classList.remove('burger--active');
    burgerMenu.classList.remove('burger-menu--active');
    document.body.classList.remove('burger-menu-overlay');
  };
})