'use strict';

(function () {
  //  Находим шаблон в разметке
  var template = document.querySelector('#picture-template');
  //  Находим эталонный элемент
  var pictureTemplate = template.content.querySelector('.picture');
  //  Блок изображений
  var picturesBlock = document.querySelector('.pictures');
  //  Блок фильтров
  var filtersBlock = document.querySelector('.filters');
  //  Массив, получаемый по запросу с сервера
  var pictures = [];
  //  Отсортированный массив
  var sortedArray = [];

  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';

  /**
   * Функция выбирает 10 не повторяющихся карточек изображений из массива полученного с сервера
   * @param {Object[]} array - массив для сортировки
   * @return {Object[]} sortedArray - отсортированный массив
   */
  var sortImagesByNew = function (array) {
    var arrayCopy = array.slice();
    sortedArray = [];

    while (sortedArray.length < 10) {
      var randomIndex = window.utils.getRandomArrayIndex(arrayCopy);
      sortedArray.push(arrayCopy[randomIndex]);
      arrayCopy.splice(randomIndex, 1);
    }

    return sortedArray;
  };

  /**
   * Функция сортирует полученный с сервера массив карточек изображений по количеству комментариев в порядке убывания
   * @param {Object[]} array - массив для сортировки
   * @return {Object[]} sortedArray - отсортированный массив
   */
  var sortImagesByComments = function (array) {
    var arrayCopy = array.slice();

    arrayCopy.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    sortedArray = arrayCopy;
    return sortedArray;
  };

  /**
   * Функция вызывает метод showGallery, который заполняет отрисованные карточки изображений
   * данными, полученными с сервера и открывает оверлей с изображением в большом масштабе
   * @param {Object} event
   * @param {Object} picture
   */
  var openGallery = function (event, picture) {
    event.preventDefault();
    window.showGallery(picture);
  };

  /**
   * Функция открывает оверлей по нажатию ENTER
   * @param {Object} event
   * @param {Object} picture
   */
  var openGalleryByEnter = function (event, picture) {
    if (window.utils.isActivateEvent(event)) {
      openGallery(event, picture);
    }
  };

  //  Функция добавляет в разметку полученные с сервера карточки изображений
  var addPictures = function (array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (picture) {
      var newContent = pictureTemplate.cloneNode(true);

      newContent.querySelector('img').src = picture.url;
      newContent.querySelector('.picture-likes').textContent = picture.likes;
      newContent.querySelector('.picture-comments').textContent = picture.comments.length;

      newContent.addEventListener('click', function (event) {
        openGallery(event, picture);
      });
      newContent.addEventListener('keydown', function (event) {
        openGalleryByEnter(event, picture);
      });

      fragment.appendChild(newContent);
    });

    picturesBlock.appendChild(fragment);
  };

  //  Функция показа блока с фильтрами выдачи изображений
  var showFilters = function () {
    filtersBlock.classList.toggle('hidden', false);
  };

  /**
   * Функция выбора фильтра выдачи изображений, в зависимости от выбранного фильтра
   * отрисовывается соответствующая выборка изображений
   * @param {Object} event
   */
  var onChangeFilter = function (event) {
    if (!event.target.value) {
      return;
    }

    picturesBlock.innerHTML = null;

    switch (event.target.value) {
      case 'popular':
        addPictures(pictures);
        break;
      case 'new':
        sortImagesByNew(pictures);
        addPictures(sortedArray);
        break;
      case 'discussed':
        sortImagesByComments(pictures);
        addPictures(sortedArray);
        break;
    }
  };

  /**
   * Call-back функция обработки данных с сервера
   * @param {Object} event
   */
  var onLoad = function (event) {
    pictures = event.target.response;
    showFilters();
    addPictures(pictures);
    filtersBlock.addEventListener('click', onChangeFilter);
  };

  window.load(DATA_URL, onLoad);
})();
