'use strict';

(function () {
  //  Находим шаблон в разметке
  var template = document.querySelector('#picture-template');
  //  Находим эталонный элемент
  var pictureTemplate = template.content.querySelector('.picture');
  //  Блок изображений
  var picturesBlock = document.querySelector('.pictures');
  //  Массив, получаемый по запросу с сервера
  var pictures = [];

  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';

  //  Функция добавляет в разметку полученные с сервера карточки изображений
  var addPictures = function () {
    var fragment = document.createDocumentFragment();

    pictures.forEach(function (picture) {
      /**
       * Функция вызывает метод showGallery, который заполняет отрисованные карточки изображений
       * данными, полученными с сервера и открывает оверлей с изображением в большом масштабе
       * @param {Object} event
       */
      var openGallery = function (event) {
        event.preventDefault();
        window.showGallery(picture);
      };

      /**
       * Функция открывает оверлей по нажатию ENTER
       * @param {Object} event
       */
      var openGalleryByEnter = function (event) {
        if (window.utils.isActivateEvent(event)) {
          openGallery(event);
        }
      };

      var newContent = pictureTemplate.cloneNode(true);

      newContent.querySelector('img').src = picture.url;
      newContent.querySelector('.picture-likes').textContent = picture.likes;
      newContent.querySelector('.picture-comments').textContent = picture.comments.length;
      newContent.addEventListener('click', openGallery);
      newContent.addEventListener('keydown', openGalleryByEnter);

      fragment.appendChild(newContent);
    });

    picturesBlock.appendChild(fragment);
  };

  /**
   * Call-back функция обработки данных с сервера
   * @param {Object} event
   */
  var onLoad = function (event) {
    var target = event.target;
    pictures = target.response;
    addPictures(pictures);
  };

  window.load(DATA_URL, onLoad);
})();
