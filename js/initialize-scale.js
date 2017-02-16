'use strict';

/**
 * Функция изменения масштаба изображения
 * @param {Object} scaleControlElement - элемент, управляющий масштабом
 * @param {number} scaleStep - шаг изменения масштаба
 * @param {number} defaultScale - масштаб по умолчанию
 * @param {Object} preview - блок предпросмотра изображения
 */
window.initializeScale = function (scaleControlElement, scaleStep, defaultScale, preview) {
  //  Основание десятичной  системы счисления
  var DECIMAL_BASE = 10;
  //  Делитель, нужный для перевода значения процентов в доли целого
  var PERCENT = 100;
  //  Максимально возможный масштаб изображения
  var maxImageScale = 100;
  //  Минимально возможный масштаб изображения
  var minImageScale = 25;
  //  Класс кнопки увеличения масштаба
  var increaseScaleButtonClass = 'upload-resize-controls-button-inc';
  //  Класс кнопки уменьшения масштаба
  var decreaseScaleButtonClass = 'upload-resize-controls-button-dec';
  //  Индикатор текущего масштаба изображаения
  var currentImageScale = window.uploadOverlay.querySelector('.upload-resize-controls-value');

  /**
   * Функция устанавливает текущий масштаб изображения и отображает значение масштаба в форме кадрирования
   * @param {number} scale - текущий масштаб изображения, в процентах
   */
  this.setAndDisplayImageScaleValue = function (scale) {
    currentImageScale.value = scale + '%';
    preview.style.transform = 'scale(' + (scale / PERCENT) + ')';
  };

  /**
   * Функция изменения масштаба изображения
   * @param {boolean} resizeFlag - если true, масштаб изменяется в сторону увеличения, иначе в сторону уменьшения
   */
  function resizeImage(resizeFlag) {
    var currentScaleValue;
    if (resizeFlag) {
      currentScaleValue = Math.min(parseInt(currentImageScale.value, DECIMAL_BASE) + scaleStep, maxImageScale);
    } else {
      currentScaleValue = Math.max(parseInt(currentImageScale.value, DECIMAL_BASE) - scaleStep, minImageScale);
    }
    window.setAndDisplayImageScaleValue(currentScaleValue);
  }

  /**
   * Функция определяет направление изменения масштаба в зависимости от того, какая кнопка нажата + или -
   * @param {Object} event
   * @return {boolean} - флаг, определяющий направление изменения масштаба изображения
   */
  function setScaleIncreaseOrDecrease(event) {
    var controlButton = event.target;
    var resizeFlag;
    if (controlButton.classList.contains(increaseScaleButtonClass)) {
      resizeFlag = true;
    } else if (controlButton.classList.contains(decreaseScaleButtonClass)) {
      resizeFlag = false;
    }
    return resizeFlag;
  }
  //  Установка значения масштаба по умолчанию
  window.setAndDisplayImageScaleValue(defaultScale);

  scaleControlElement.addEventListener('click', function (event) {
    resizeImage(setScaleIncreaseOrDecrease(event));
  });
};
