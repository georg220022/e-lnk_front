const modalBtns = document.querySelectorAll('.modal-button');
const modalCloseBtns = document.querySelectorAll('.modal__close-button');

modalBtns.forEach(modalBtn => {
  modalBtn.addEventListener('click', function(e) {
    let currentModalID = modalBtn.getAttribute('data-target');
    let currentModal = document.getElementById(currentModalID);
    if (!currentModal) {
      currentModal = document.querySelector('.modal');
    };

    currentModal.classList.add('modal--open');
    document.body.classList.add('lock');

    if (currentModal.classList.contains('modal--open')) {
      currentModal.addEventListener('click', function(e) {
        if (!e.target.closest('.modal__body')) {
          currentModal.classList.remove('modal--open');
          document.body.classList.remove('lock');
        };
      });
    };

    modalCloseBtns.forEach(modalCloseBtn => {
      modalCloseBtn.addEventListener('click', function() {
        currentModal.classList.remove('modal--open');
        document.body.classList.remove('lock');
      });
    });
  });
});