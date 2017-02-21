'use strict';

window.initializeFilters = (function () {
  //  Текущий фильтр
  var currentFilter = null;

  /**
   * Функция получения значения фильтра по нажатию клавиши
   * @param {Object} event - клавиатурное событие
   */
  var getFilterOnKeydown = function (event) {
    var filter = event.target;
    filter.control.checked = true;
    currentFilter = filter.control.defaultValue;
  };

  /**
   * Функция получения значения фильтра по клику мышью на элемент управления
   * @param {Object} event - событие мыши
   * @param {Object} filtersBlock - блок контроля фильтров изображения
   */
  var getFilterOnClick = function (event, filtersBlock) {
    if (event.target !== filtersBlock) {
      currentFilter = event.target.value;
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
     * @param {function} callback - функция применения текущего значения фильтра
     */
    activateFilters: function (filtersBlock, callback) {
      clickHandler = function (event) {
        getFilterOnClick(event, filtersBlock);

        if (typeof callback === 'function') {
          callback(currentFilter);
        }
      };
      filtersBlock.addEventListener('click', clickHandler);

      keydownHandler = function (event) {
        if (window.utils.isActivateEvent(event)) {
          getFilterOnKeydown(event);

          if (typeof callback === 'function') {
            callback(currentFilter);
          }
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
     * @param {function} callback - функция применения текущего значения фильтра
     */
    resetFilters: function (filtersBlock, defaultValue, callback) {
      var defaultFilterToggle = filtersBlock.querySelector('input[value=' + defaultValue);
      defaultFilterToggle.checked = true;
      currentFilter = defaultValue;

      if (typeof callback === 'function') {
        callback(defaultValue);
      }
    }
  };
})();
