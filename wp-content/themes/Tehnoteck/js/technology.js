(function () {
  'use strict';

  let operateScheme = new function () {
    let body = document.querySelector('body');
    let list = document.querySelector('.scheme__list');
    let items = list.querySelectorAll('.scheme__item');
    let modalList = list.querySelectorAll('.mod__wrapper');
    var hasScrollbar = window.innerWidth > document.documentElement.clientWidth;

    function clearActiveModal () {
      let activeModal = body.querySelector('.mod--active');
      if (activeModal) {
        activeModal.parentNode.querySelector('.scheme__name').style = '';
        activeModal.remove();
        if (hasScrollbar) {
          body.classList.remove('body--pad');
        }
        body.classList.remove('body--block');
      }
    }

    function showModal (elem, i) {
      let modal = modalList[i].cloneNode(true);
      let btn = modal.querySelector('.mod__close');

      function handleClickBtn () {
        clearActiveModal();
        btn.removeEventListener('click', handleClickBtn);
      }

      function handleEscPressed (evt) {
        const escKey = 27;

        if (evt.keyCode === escKey) {
          clearActiveModal();
          document.removeEventListener('keydown', handleEscPressed);
        }
      }

      modal.style = "display: block";
      modal.classList.add('mod--active');
      body.appendChild(modal);
      body.classList.add('body--block');
      if (hasScrollbar) {
        body.classList.add('body--pad');
      }
      items[i].querySelector('.scheme__name').style = "display: none";

      btn.addEventListener('click', handleClickBtn);
      document.addEventListener('keydown', handleEscPressed);
    }

    this.toggleModal = function () {
      items.forEach((item, index) => {
        item.addEventListener('click', function (evt) {
          clearActiveModal();
          showModal(item, index);
        });
      });
    }
  }

  operateScheme.toggleModal();
})();
