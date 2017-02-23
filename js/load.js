'use strict';

window.load = (function () {
  /**
   * Функция загрузки данных с сервера
   * @param {string} url - адрес хранения данных
   * @param {function} onLoad - call-back функция обработки полученных данных
   */
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function (event) {
      if (typeof onLoad === 'function') {
        onLoad(event);
      }
    });

    xhr.open('GET', url);
    xhr.send();
  };
})();
