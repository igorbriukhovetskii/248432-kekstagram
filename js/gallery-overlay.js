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
  var closeGalleryOnEnter = function (event) {
    if (window.utils.isActivateEvent(event)) {
      closeGallery(event);
    }
  };

  /**
   * Функция закрывает галлерею по нажатию клавиши ESCAPE
   * @param {Object} event - клавиатурное событие
   */
  var closeGalleryOnEscapeButton = function (event) {
    if (window.utils.isDeactivateEvent(event)) {
      closeGallery(event);
    }
  };

  //  Функция скрывает оверлей галлереи и удаляет обработчики событий
  var closeGallery = function () {
    galleryOverlay.classList.toggle('invisible', true);
    document.removeEventListener('keydown', closeGalleryOnEscapeButton);
    closeButton.removeEventListener('click', closeGallery);
    closeButton.removeEventListener('keydown', closeGalleryOnEnter);
  };

  /**
   * Функция заполняет карточки изображений данными с сервера и добавляет обработчики событий для
   * открытия и закрытия галлереи
   * @param {Object[]} data - данные, получаемые с сервера
   */
  return function (data) {
    document.addEventListener('keydown', closeGalleryOnEscapeButton);
    closeButton.addEventListener('click', closeGallery);
    closeButton.addEventListener('keydown', closeGalleryOnEnter);
    galleryOverlay.classList.toggle('invisible', false);
    image.src = data.url;
    like.textContent = data.likes;
    comments.textContent = data.comments.length;
    closeButton.focus();
  };
})();
