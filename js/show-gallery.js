'use strict';

window.showGallery = (function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var closeButton = galleryOverlay.querySelector('.gallery-overlay-close');
  var image = galleryOverlay.querySelector('.gallery-overlay-image');
  var like = galleryOverlay.querySelector('.likes-count');
  var comments = galleryOverlay.querySelector('.comments-count');

  /**
   * Функция открывает оверлей галлерей по нажатию клавиши ENTER
   * @param {Object} event - клавиатурное событие
   */
  var onGalleryCloseByEnterKey = function (event) {
    if (window.utils.isActivateEvent(event)) {
      onGalleryClose();
    }
  };

  /**
   * Функция закрывает галлерею по нажатию клавиши ESCAPE
   * @param {Object} event - клавиатурное событие
   */
  var onGalleryCloseByEscapeKey = function (event) {
    if (window.utils.isDeactivateEvent(event)) {
      onGalleryClose();
    }
  };

  //  Функция скрывает оверлей галлереи и удаляет обработчики событий
  var onGalleryClose = function () {
    galleryOverlay.classList.toggle('invisible', true);
    document.removeEventListener('keydown', onGalleryCloseByEscapeKey);
    closeButton.removeEventListener('click', onGalleryClose);
    closeButton.removeEventListener('keydown', onGalleryCloseByEnterKey);
  };

  /**
   * Функция заполняет карточки изображений данными с сервера и добавляет обработчики событий для
   * открытия и закрытия галлереи
   * @param {Object[]} data - данные, получаемые с сервера
   */
  return function (data) {
    document.addEventListener('keydown', onGalleryCloseByEscapeKey);
    closeButton.addEventListener('click', onGalleryClose);
    closeButton.addEventListener('keydown', onGalleryCloseByEnterKey);
    galleryOverlay.classList.toggle('invisible', false);
    image.src = data.url;
    like.textContent = data.likes;
    comments.textContent = data.comments.length;
    closeButton.focus();
  };
})();
