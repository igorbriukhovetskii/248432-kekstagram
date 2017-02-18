'use strict';

window.initializeFilters = (function () {
  /**
   * Функция присвоения предпросмотру изображения класса соответствующего фильтра
   * @param {Object} previewImage - блок предпросмотра изображения, к нему применяются эффекты фильтров
   * @param {string} previewImageClass - класс блока предпросмотра изображения
   * @param {string} filterValue - значение выбранного фильтра
   */
  var addFilterClassToImage = function (previewImage, previewImageClass, filterValue) {
    previewImage.className = previewImageClass;
    previewImage.classList.add('filter-' + filterValue);
  };

  /**
   * Функция применения фильтра по нажатию клавиши
   * @param {Object} event - клавиатурное событие
   * @param {Object} previewImage - блок предпросмотра изображения, к нему применяются эффекты фильтров
   * @param {string} previewImageClass - класс блока предпросмотра изображения
   */
  var applyFilterOnKeydown = function (event, previewImage, previewImageClass) {
    var filter = event.target;
    var filterName = filter.control.defaultValue;
    filter.control.checked = true;
    addFilterClassToImage(previewImage, previewImageClass, filterName);
  };

  /**
   * Функция применения фильтра по клику мышью на элемент управления
   * @param {Object} event - событие мыши
   * @param {Object} filtersBlock - блок контроля фильтров изображения
   * @param {Object} previewImage - блок предпросмотра изображения, к нему применяются эффекты фильтров
   * @param {string} previewImageClass - класс блока предпросмотра изображения
   */
  var applyFilterOnClick = function (event, filtersBlock, previewImage, previewImageClass) {
    if (event.target !== filtersBlock) {
      addFilterClassToImage(previewImage, previewImageClass, event.target.value);
    }
  };

  //  Ссылка на обработчик клика мышью
  var clickHandler = null;
  //  Ссылка на обработчик нажатия клавиши
  var keydownHandler = null;

  return {
    /**
     * Метод инициализирует работу фильтров
     * @param {Object} filtersBlock - блок контроля фильтров изображения
     * @param {Object} previewImage - блок предпросмотра изображения, к нему применяются эффекты фильтров
     * @param {string} previewClass - класс блока предпросмотра изображения
     */
    activateFilters: function (filtersBlock, previewImage, previewClass) {
      clickHandler = function (event) {
        applyFilterOnClick(event, filtersBlock, previewImage, previewClass);
      };
      filtersBlock.addEventListener('click', clickHandler);

      keydownHandler = function (event) {
        if (window.utils.isActivateEvent(event)) {
          applyFilterOnKeydown(event, previewImage, previewClass);
        }
      };
      filtersBlock.addEventListener('keydown', keydownHandler);
    },

    /**
     * Метод деактивирует работу фильтров
     * @param {Object} filtersBlock - блок контроля фильтров изображения
     */
    deactivateFilters: function (filtersBlock) {
      filtersBlock.removeEventListener('click', clickHandler);
      filtersBlock.removeEventListener('keydown', keydownHandler);
    },

    /**
     * Метод задаёт фильтру изображения значение по умолчанию
     * @param {Object} filtersBlock - блок контроля фильтров изображения
     * @param {string} defaultValue - значение фильтра по умолчанию
     * @param {Object} previewImage - блок предпросмотра изображения, к нему применяются эффекты фильтров
     * @param {string} previewImageClass - класс блока предпросмотра изображения
     */
    resetFilters: function (filtersBlock, defaultValue, previewImage, previewImageClass) {
      addFilterClassToImage(previewImage, previewImageClass, defaultValue);
      var defaultFilterToggle = filtersBlock.querySelector('input[value=' + defaultValue);
      defaultFilterToggle.checked = true;
    }
  };
})();
