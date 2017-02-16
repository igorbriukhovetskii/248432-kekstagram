'use strict';

window.utils = {
  //  Код клавиши ENTER
  ENTER_KEY_CODE: 13,
  //  Код клавиши ESCAPE
  ESCAPE_KEY_CODE: 27,
  /**
   * Метод, проверяющий нажатие клавиши
   * @param {Object} event - клавиатурное событие
   * @param {number} key - код клавишы
   * @return {boolean}
   */
  isKeyPressed: function (event, key) {
    return event.keyCode && event.keyCode === key;
  }
};
