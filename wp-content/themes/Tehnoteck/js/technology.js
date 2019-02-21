(function () {
  'use strict';

  let operateScheme = new function () {
    let body = document.querySelector('body');
    let list = document.querySelector('.scheme__list');
    let items = list.querySelectorAll('.scheme__item');
    let modalList = list.querySelectorAll('.mod__wrapper');
    let names = list.querySelectorAll('.scheme__name');
    var hasScrollbar = window.innerWidth > document.documentElement.clientWidth;

    function clearActiveModal () {
      let activeModal = body.querySelector('.mod__wrapper--opened');
      if (activeModal) {
        activeModal.style.animationName = 'hideup';
        activeModal.addEventListener('animationend', function () {
          activeModal.remove();
        });
        if (hasScrollbar) {
          body.classList.remove('body--pad');
        }
        body.classList.remove('body--block');
        names.forEach(name => {
          name.style = '';
        });
        items.forEach(item => {
          item.classList.remove('scheme__item--selected');
        });
      }
    }

    function showModal (elem, i) {
      let modal = modalList[i].cloneNode(true);
      let btn = modal.querySelector('.mod__close');

      function handleClickBtn () {
        clearActiveModal();
        btn.removeEventListener('click', handleClickBtn);
      }

      function hangleMissClick (evt) {
        if (evt.target.classList.contains('mod__wrapper')) {
          clearActiveModal();
          document.removeEventListener('click', hangleMissClick);
        }
      }

      function handleEscPressed (evt) {
        const escKey = 27;

        if (evt.keyCode === escKey) {
          clearActiveModal();
          document.removeEventListener('keydown', handleEscPressed);
        }
      }

      body.appendChild(modal);
      modal.classList.add('mod__wrapper--opened');
      modal.style.animationName = "dropdown";
      elem.querySelector('.scheme__name').style = 'display: none';
      elem.classList.add('scheme__item--selected');
      body.classList.add('body--block');
      if (hasScrollbar) {
        body.classList.add('body--pad');
      }

      btn.addEventListener('click', handleClickBtn);
      document.addEventListener('keydown', handleEscPressed);
      document.addEventListener('click', hangleMissClick);
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
