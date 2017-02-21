'use strict';

window.initializeScale = (function () {
  //  Максимально возможный масштаб изображения
  var maxImageScale = 100;
  //  Минимально возможный масштаб изображения
  var minImageScale = 25;
  //  Последний выбранный масштаб изображения
  var currentScaleValue = null;
  //  Класс кнопки увеличения масштаба
  var increaseScaleButtonClass = 'upload-resize-controls-button-inc';
  //  Класс кнопки уменьшения масштаба
  var decreaseScaleButtonClass = 'upload-resize-controls-button-dec';
  //  Индикатор текущего масштаба изображаения
  var currentImageScale = document.querySelector('.upload-resize-controls-value');

  /**
   * Функция изменения масштаба изображения
   * @param {boolean} resizeFlag - если true, масштаб изменяется в сторону увеличения, иначе в сторону уменьшения
   * @param {number} scaleStep - шаг изменения масштаба
   */
  var getNewControlValue = function (resizeFlag, scaleStep) {
    if (resizeFlag) {
      currentScaleValue = Math.min(currentScaleValue + scaleStep, maxImageScale);
    } else {
      currentScaleValue = Math.max(currentScaleValue - scaleStep, minImageScale);
    }
  };

  /**
   * Функция изменения значения счётчика масштаба
   * @param {number} value - текущее отображаемое значение счётчика
   */
  var displayNewValue = function (value) {
    currentImageScale.value = value + '%';
  };

  /**
   * Функция определяет направление изменения масштаба в зависимости от того, какая кнопка нажата + или -
   * @param {Object} event
   * @return {boolean} - флаг, определяющий направление изменения масштаба изображения
   */
  var setScaleIncreaseOrDecrease = function (event) {
    var controlButton = event.target;
    var resizeFlag;
    if (controlButton.classList.contains(increaseScaleButtonClass)) {
      resizeFlag = true;
    } else if (controlButton.classList.contains(decreaseScaleButtonClass)) {
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
        displayNewValue(currentScaleValue);

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
     * @param {function} callback - функция применения текущего масштаба к соответствующему стилю CSS
     */
    resetScale: function (defaultScale, callback) {
      currentScaleValue = defaultScale;
      displayNewValue(currentScaleValue);

      if (typeof callback === 'function') {
        callback(defaultScale);
      }
    }
  };
})();
