'use strict';

/**
 * Функция работы с фильтрами изображения
 * @param {Object} filtersBlock - блок контроля фильтров изображения
 * @param {Object} preview - блок предпросмотра изображения, к нему применяются эффекты фильтров
 * @param {string} previewClass - класс блока предпросмотра изображения
 */
window.initializeFilters = function (filtersBlock, preview, previewClass) {
  //  Значение фильтра по умолчанию
  var defaultFilterValue = 'none';

  function applyFilterOnKeydown(event) {
    var filter = event.target;
    var filterName = filter.control.defaultValue;
    filter.control.checked = true;
    preview.className = previewClass;
    preview.classList.add('filter-' + filterName);
  }

  function applyFilterOnClick(event) {
    if (event.target !== filtersBlock) {
      preview.className = previewClass;
      preview.classList.add('filter-' + event.target.value);
    }
  }

  /**
   * Функция задаёт фильтру изображения значение по умолчанию
   * @param {string} defaultValue - значение фильтра по умолчанию
   */
  function resetFilterToDefault(defaultValue) {
    preview.className = previewClass;
    preview.classList.add('filter-' + defaultValue);
    var defaultFilterToggle = filtersBlock.querySelector('input[value=' + defaultValue);
    defaultFilterToggle.checked = true;
  }

  resetFilterToDefault(defaultFilterValue);

  filtersBlock.addEventListener('click', function (event) {
    applyFilterOnClick(event);
  });

  filtersBlock.addEventListener('keydown', function (event) {
    if (window.isKeyPressed(event, window.ENTER_KEY_CODE)) {
      applyFilterOnKeydown(event);
    }
  });
};
