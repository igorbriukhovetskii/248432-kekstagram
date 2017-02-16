'use strict';

/**
 * Функция работы с фильтрами изображения
 * @param {Object} filtersBlock - блок контроля фильтров изображения
 * @param {Object} preview - блок предпросмотра изображения, к нему применяются эффекты фильтров
 * @param {string} previewClass - класс блока предпросмотра изображения
 */
window.initializeFilters = function (filtersBlock, preview, previewClass) {
  /**
   * Функция присвоения предпросмотру изображения класса соответствующего фильтра
   * @param {Object} previewImage - блок предпросмотра изображения, к нему применяются эффекты фильтров
   * @param {string} previewImageClass - класс блока предпросмотра изображения
   * @param {string} filterValue - значение выбранного фильтра
   */
  function addFilterClassToImage(previewImage, previewImageClass, filterValue) {
    previewImage.className = previewImageClass;
    previewImage.classList.add('filter-' + filterValue);
  }

  /**
   * Функция применения фильтра по нажатию клавиши
   * @param {Object} event - клавиатурное событие
   * @param {Object} previewImage - блок предпросмотра изображения, к нему применяются эффекты фильтров
   * @param {string} previewImageClass - класс блока предпросмотра изображения
   */
  function applyFilterOnKeydown(event, previewImage, previewImageClass) {
    var filter = event.target;
    var filterName = filter.control.defaultValue;
    filter.control.checked = true;
    addFilterClassToImage(previewImage, previewImageClass, filterName);
  }

  /**
   * Функция применения фильтра по клику мышью на элемент управления
   * @param {Object} event - событие мыши
   * @param {Object} filters - блок контроля фильтров изображения
   * @param {Object} previewImage - блок предпросмотра изображения, к нему применяются эффекты фильтров
   * @param {string} previewImageClass - класс блока предпросмотра изображения
   */
  function applyFilterOnClick(event, filters, previewImage, previewImageClass) {
    if (event.target !== filters) {
      addFilterClassToImage(previewImage, previewImageClass, event.target.value);
    }
  }

  /**
   * Функция задаёт фильтру изображения значение по умолчанию
   * @param {string} defaultValue - значение фильтра по умолчанию
   * @param {Object} previewImage - блок предпросмотра изображения, к нему применяются эффекты фильтров
   * @param {string} previewImageClass - класс блока предпросмотра изображения
   */
  this.resetFilterToDefault = function (defaultValue, previewImage, previewImageClass) {
    addFilterClassToImage(previewImage, previewImageClass, defaultValue);
    var defaultFilterToggle = filtersBlock.querySelector('input[value=' + defaultValue);
    defaultFilterToggle.checked = true;
  };

  filtersBlock.addEventListener('click', function (event) {
    applyFilterOnClick(event, filtersBlock, preview, previewClass);
  });

  filtersBlock.addEventListener('keydown', function (event) {
    if (window.utils.isKeyPressed(event, window.utils.ENTER_KEY_CODE)) {
      applyFilterOnKeydown(event, preview, previewClass);
    }
  });
};
