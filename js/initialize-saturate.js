'use strict';

window.saturate = (function () {
  var imagePreview = document.querySelector('.filter-image-preview');
  /**
   * Функция применяет к изображению CSS фильтр и меняет его интенсивность
   * в зависимости от переданного слайдером значения
   * @param {Object} image - изображение
   */
  var changeSaturation = function (image) {
    switch (image.className) {
      case 'filter-image-preview filter-none':
        image.style.filter = 'none';
        break;
      case 'filter-image-preview filter-chrome':
        image.style.filter = 'grayscale(' + window.slider.getValue() + ')';
        break;
      case 'filter-image-preview filter-sepia':
        image.style.filter = 'sepia(' + window.slider.getValue() + ')';
        break;
      case 'filter-image-preview filter-marvin':
        image.style.filter = 'invert(' + window.slider.getValue() * 100 + '%)';
        break;
      case 'filter-image-preview filter-phobos':
        image.style.filter = 'hue-rotate(' + window.slider.getValue() * 270 + 'deg)';
        break;
      case 'filter-image-preview filter-heat':
        var minSaturate = 100;
        image.style.filter = 'saturate(' + Math.max((window.slider.getValue() * 500), minSaturate) + '%)';
    }
  };
  return function () {
    changeSaturation(imagePreview);
  };
})();
