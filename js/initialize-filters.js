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
   */
  var getFilterOnClick = function (event) {
    if (event.target.value) {
      currentFilter = event.target.value;
    }
  };
  //  Ссылка на обработчик клика мышью
  var onFiltersBlockClick = null;
  //  Ссылка на обработчик нажатия клавиши
  var onFiltersBlockEnterKeydown = null;

  return {
    /**
     * Метод инициализирует работу фильтров
     * @param {Object} filtersBlock - блок контроля фильтров изображения
     * @param {function} callback - функция применения текущего значения фильтра
     */
    activate: function (filtersBlock, callback) {
      onFiltersBlockClick = function (event) {
        getFilterOnClick(event);

        if (typeof callback === 'function') {
          callback(currentFilter);
        }
      };
      filtersBlock.addEventListener('click', onFiltersBlockClick);

      onFiltersBlockEnterKeydown = function (event) {
        if (!window.utils.isActivateEvent(event)) {
          return;
        }

        getFilterOnKeydown(event);

        if (typeof callback === 'function') {
          callback(currentFilter);
        }
      };
      filtersBlock.addEventListener('keydown', onFiltersBlockEnterKeydown);
      window.slider.initialize();
    },

    /**
     * Метод деактивирует работу фильтров
     * @param {Object} filtersBlock - блок контроля фильтров изображения
     */
    deactivate: function (filtersBlock) {
      filtersBlock.removeEventListener('click', onFiltersBlockClick);
      filtersBlock.removeEventListener('keydown', onFiltersBlockEnterKeydown);
    },

    /**
     * Метод задаёт фильтру изображения значение по умолчанию
     * @param {Object} filtersBlock - блок контроля фильтров изображения
     * @param {string} defaultValue - значение фильтра по умолчанию
     * @param {function} callback - функция применения текущего значения фильтра
     */
    reset: function (filtersBlock, defaultValue, callback) {
      var defaultFilterToggle = filtersBlock.querySelector('input[value=' + defaultValue);
      defaultFilterToggle.checked = true;
      currentFilter = defaultValue;

      if (typeof callback === 'function') {
        callback(defaultValue);
      }
    }
  };
})();
