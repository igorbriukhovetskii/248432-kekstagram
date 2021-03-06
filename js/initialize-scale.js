'use strict';

window.initializeScale = (function () {
  //  Максимально возможный масштаб изображения
  var MAX_IMAGE_SCALE = 100;
  //  Минимально возможный масштаб изображения
  var MIN_IMAGE_SCALE = 25;
  //  Последний выбранный масштаб изображения
  var currentScaleValue = null;

  /**
   * Функция изменения масштаба изображения
   * @param {boolean} resizeFlag - если true, масштаб изменяется в сторону увеличения, иначе в сторону уменьшения
   * @param {number} scaleStep - шаг изменения масштаба
   */
  var calculateNewScaleValue = function (resizeFlag, scaleStep) {
    switch (resizeFlag) {
      case true:
        currentScaleValue = Math.min(currentScaleValue + scaleStep, MAX_IMAGE_SCALE);
        break;
      case false:
        currentScaleValue = Math.max(currentScaleValue - scaleStep, MIN_IMAGE_SCALE);
        break;
    }
  };

  /**
   * Функция изменения значения счётчика масштаба
   * @param {number} value - текущее отображаемое значение счётчика
   * @param {Object} scaleControlElement - элемент страницы (контрол изменения масштаба)
   */
  var displayNewValue = function (value, scaleControlElement) {
    //  Индикатор текущего масштаба изображения
    var currentImageScale = scaleControlElement.querySelector('.upload-resize-controls-value');
    currentImageScale.value = value + '%';
  };

  /**
   * Функция определяет направление изменения масштаба в зависимости от того, какая кнопка нажата + или -
   * @param {Object} event
   * @return {boolean} - флаг, определяющий направление изменения масштаба изображения
   */
  var setScaleIncreaseOrDecrease = function (event) {
    var resizeFlag = null;

    switch (event.target.innerText) {
      case '+':
        resizeFlag = true;
        break;
      case '–':
        resizeFlag = false;
        break;
    }
    return resizeFlag;
  };

  //  Ссылка на обработчик управления масштабом изображения
  var onScaleControlElementClicked = null;

  return {
    /**
     * Метод управляет изменением масштаба изображения
     * @param {Object} scaleControlElement - элемент страницы (контрол изменения масштаба)
     * @param {number} scaleStep - шаг изменения масштаба
     * @param {function} callback - функция применения текущего масштаба к соответствующему стилю CSS
     */
    activateScale: function (scaleControlElement, scaleStep, callback) {
      onScaleControlElementClicked = function (event) {
        calculateNewScaleValue(setScaleIncreaseOrDecrease(event), scaleStep);
        displayNewValue(currentScaleValue, scaleControlElement);

        if (typeof callback === 'function') {
          callback(currentScaleValue);
        }
      };
      scaleControlElement.addEventListener('click', onScaleControlElementClicked);
    },

    /**
     * Деактивация управления масштабом
     * @param {Object} scaleControlElement - элемент страницы (контрол изменения масштаба)
     */
    deactivateScale: function (scaleControlElement) {
      scaleControlElement.removeEventListener('click', onScaleControlElementClicked);
    },

    /**
     * Метод сбрасывает значение масштаба изображения на величину по умолчанию
     * @param {number} defaultScale - масштаб по умолчанию
     * @param {Object} scaleControlElement - элемент страницы (контрол изменения масштаба)
     * @param {function} callback - функция применения текущего масштаба к соответствующему стилю CSS
     */
    resetScale: function (defaultScale, scaleControlElement, callback) {
      currentScaleValue = defaultScale;
      displayNewValue(currentScaleValue, scaleControlElement);

      if (typeof callback === 'function') {
        callback(defaultScale);
      }
    }
  };
})();
