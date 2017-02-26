'use strict';

window.slider = (function () {
  //  Слайдер
  var sliderNode = document.querySelector('.upload-filter-level');
  //  Дорожка слайдера
  var sliderLine = sliderNode.querySelector('.upload-filter-level-line');
  //  Контрол слайдера
  var sliderPin = sliderLine.querySelector('.upload-filter-level-pin');
  //  Индикатор заполнения слайдера
  var sliderLevel = sliderLine.querySelector('.upload-filter-level-val');
  //  Минимальное значение слайдера
  var minValue = 0;
  //  Максимальное значение слайдера
  var maxVal = null;
  //  Стартовая позиция слайдера
  var startValue = 0.75;
  //  Начальная точка движения контрола слайдера
  var startPoint;
  //  Текущая позиция слайдера
  var currentValue = startValue;

  /**
   * Функция задаёт начальные координаты движения контрола слайдера при клике на него
   * @param {Object} event
   */
  var onSliderPinMouseDown = function (event) {
    event.preventDefault();
    startPoint = {
      x: event.clientX
    };

    sliderNode.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /**
   * Функция перемещает контрол слайдера при движении курсора мыши
   * @param {Object} event
   */
  var onMouseMove = function (event) {
    event.preventDefault();
    var shift = {
      x: startPoint.x - event.clientX
    };
    var currentCoordinates = sliderPin.offsetLeft - shift.x;
    currentValue = currentCoordinates / maxVal;
    sliderPin.style.left = sliderPin.offsetLeft - shift.x + 'px';
    if (currentCoordinates < minValue) {
      sliderPin.style.left = '0px';
    }
    if (currentCoordinates > maxVal) {
      sliderPin.style.left = maxVal + 'px';
    }
    sliderLevel.style.width = sliderPin.offsetLeft + 'px';
    startPoint = {
      x: event.clientX
    };
  };

  /**
   * Функцие отключает слушатели событий при отжатии клавиши мыши
   * @param {Object} event
   */
  var onMouseUp = function (event) {
    event.preventDefault();

    sliderNode.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  return {
    initialize: function () {
      //  Установка слайдера в стартовую позицию
      sliderPin.style.left = sliderLine.clientWidth * startValue + 'px';
      //  Установка индикатора заполнения слайдера в стартовое значение
      sliderLevel.style.width = sliderLine.clientWidth * startValue + 'px';
      //  Вычисление максимального значения слайдера
      maxVal = sliderLine.clientWidth;
    },
    //  Метод отключает видимость у слайдера
    hide: function () {
      sliderNode.style.visibility = 'hidden';
      sliderPin.removeEventListener('mousedown', onSliderPinMouseDown);
    },
    //  Метод делает слайдер видимым
    show: function () {
      sliderNode.style.visibility = 'visible';
      sliderPin.addEventListener('mousedown', onSliderPinMouseDown);
    },
    //  Метод возвращает текущее значение слайдера
    getValue: function () {
      return currentValue;
    }
  };
})();
