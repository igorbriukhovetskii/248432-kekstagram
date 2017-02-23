'use strict';

window.initializeScale = (function () {
  //  Максимально возможный масштаб изображения
  var MAX_IMAGE_SCALE = 100;
  //  Минимально возможный масштаб изображения
  var MIN_IMAGE_SCALE = 25;
  //  Класс кнопки увеличения масштаба
  var INCREASE_SCALE_BUTTON_CLASS = 'upload-resize-controls-button-inc';
  //  Класс кнопки уменьшения масштаба
  var DECREASE_SCALE_BUTTON_CLASS = 'upload-resize-controls-button-dec';

  //  Последний выбранный масштаб изображения
  var currentScaleValue = null;

  /**
   * Функция изменения масштаба изображения
   * @param {boolean} resizeFlag - если true, масштаб изменяется в сторону увеличения, иначе в сторону уменьшения
   * @param {number} scaleStep - шаг изменения масштаба
   */
  var getNewControlValue = function (resizeFlag, scaleStep) {
    if (resizeFlag) {
      currentScaleValue = Math.min(currentScaleValue + scaleStep, MAX_IMAGE_SCALE);
    } else {
      currentScaleValue = Math.max(currentScaleValue - scaleStep, MIN_IMAGE_SCALE);
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
   * Функция проверки наличия класса у элемента
   * @param {Object} event
   * @param {string} className - имя CSS-класса
   * @return {boolean}
   */
  var isContainClass = function (event, className) {
    var target = event.target;
    return target.classList.contains(className);
  };
  /**
   * Функция определяет направление изменения масштаба в зависимости от того, какая кнопка нажата + или -
   * @param {Object} event
   * @return {boolean} - флаг, определяющий направление изменения масштаба изображения
   */
  var setScaleIncreaseOrDecrease = function (event) {
    var resizeFlag;
    if (isContainClass(event, INCREASE_SCALE_BUTTON_CLASS)) {
      resizeFlag = true;
    }
    if (isContainClass(event, DECREASE_SCALE_BUTTON_CLASS)) {
      resizeFlag = false;
    }
    return resizeFlag;
  };

  //  Ссылка на обработчик управления масштабом изображения
  var scaleHandler = null;

  return {
    /**
     * Метод управляет изменением масштаба изображения
     * @param {Object} scaleControlElement - элемент страницы (контрол изменения масштаба)
     * @param {number} scaleStep - шаг изменения масштаба
     * @param {function} callback - функция применения текущего масштаба к соответствующему стилю CSS
     */
    activateScale: function (scaleControlElement, scaleStep, callback) {
      scaleHandler = function (event) {
        getNewControlValue(setScaleIncreaseOrDecrease(event), scaleStep);
        displayNewValue(currentScaleValue, scaleControlElement);

        if (typeof callback === 'function') {
          callback(currentScaleValue);
        }
      };
      scaleControlElement.addEventListener('click', scaleHandler);
    },

    /**
     * Деактивация управления масштабом
     * @param {Object} scaleControlElement - элемент страницы (контрол изменения масштаба)
     */
    deactivateScale: function (scaleControlElement) {
      scaleControlElement.removeEventListener('click', scaleHandler);
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
