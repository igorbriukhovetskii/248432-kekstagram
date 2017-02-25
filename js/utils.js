'use strict';

window.utils = (function () {
  //  Код клавиши ENTER
  var ENTER_KEY_CODE = 13;
  //  Код клавиши ESCAPE
  var ESCAPE_KEY_CODE = 27;

  return {
    /**
     * Метод, проверяющий нажатие клавиши ENTER
     * @param {Object} event - клавиатурное событие
     * @return {boolean}
     */
    isActivateEvent: function (event) {
      return event.keyCode && event.keyCode === ENTER_KEY_CODE;
    },

    /**
     * Метод, проверяющий нажатие клавиши ESCAPE
     * @param {Object} event - клавиатурное событие
     * @return {boolean}
     */
    isDeactivateEvent: function (event) {
      return event.keyCode && event.keyCode === ESCAPE_KEY_CODE;
    },

    /**
     * Метод, возвращающий случайный индекс элемента массива
     * @param {Array} array
     * @return {number}
     */
    getRandomArrayIndex: function (array) {
      return Math.floor(Math.random() * array.length);
    }
  };
})();
