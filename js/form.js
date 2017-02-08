'use strict';
//  Форма загрузки изображения
var uploadForm = document.querySelector('#upload-select-image');
//  Поле загрузки изображения в форме
var uploadFormInput = uploadForm.querySelector('#upload-file');
//  Блок с формой кадрирования изображения
var uploadOverlay = document.querySelector('.upload-overlay');
//  Кнопка закрытия блока с формой кадрирования изображения
var uploadCancel = uploadOverlay.querySelector('#upload-cancel');
//  Переключатели фильтров изображения
var filterToggle = uploadOverlay.querySelectorAll('input[name = "upload-filter"]');
//  Предпросмотр изображения
var imagePreview = uploadOverlay.querySelector('.filter-image-preview');
//  Кнопка увеличения размера изображения
var increaseImageScale = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
//  Кнопка уменьшения размера изображения
var decreaseImageScale = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
//  Индикатор текущего масштаба изображаения
var currentImageScale = uploadOverlay.querySelector('.upload-resize-controls-value');
//  Масштаб изображения по умолчанию
var defaultImageScale = 100;
//  Максимально возможный масштаб изображения
var maxImageScale = 100;
//  Минимально возможный масштаб изображения
var minImageScale = 25;
//  Шаг изменения масштаба изображения
var changeImageScaleStep = 25;

//  Переменные, хранящие имена классов CSS
//  Класс изображения с предпросмотром эффектов наложения фильтра и кадрирования
var imagePreviewClass = 'filter-image-preview';
//  Класс скрытого блока
var hiddenElementClass = 'invisible';

//  Константы
//  Делитель, нужный для перевода значения процентов в доли целого
var PERCENT = 100;
//  Основание десятичной  системы счисления
var DECIMAL_BASE = 10;

/**
 * Функция, показывающая/скрывающая форму кадрирования изображения
 * @param {string} className - класс для сокрытия блока
 */
function toggleUploadOverlay(className) {
  uploadForm.classList.toggle(className);
  uploadOverlay.classList.toggle(className);
}
/**
 * Функция устанавливает текущий масштаб изображения и отображает значение масштаба в форме кадрирования
 * @param {number} scale - текущий масштаб изображения, в процентах
 */
function setAndDisplayImageScaleValue(scale) {
  currentImageScale.value = scale + '%';
  imagePreview.style.transform = 'scale(' + (scale / PERCENT) + ')';
}

//  Подключение обработчика событий при изменении статуса поля загрузки изображения
uploadFormInput.addEventListener('change', function () {
  toggleUploadOverlay(hiddenElementClass);
  setAndDisplayImageScaleValue(defaultImageScale);
  //  Сброс фильтра на значение по умолчанию
  for (var i = 0, length = filterToggle.length; i < length; i++) {
    if (filterToggle[i].checked === true) {
      imagePreview.className = imagePreviewClass;
      imagePreview.classList.add('filter-' + filterToggle[i].value);
    }
  }
});
//  Подключение обработчика событий к кнопке закрытия формы кадрирования изображения
uploadCancel.addEventListener('click', function () {
  toggleUploadOverlay(hiddenElementClass);
});
//  Подключение обработчика событий к радиобаттонам фильтров
for (var i = 0, length = filterToggle.length; i < length; i++) {
  filterToggle[i].addEventListener('change', function (event) {
    imagePreview.className = imagePreviewClass;
    imagePreview.classList.add('filter-' + event.target.value);
  });
}
//  Управление масштабом изображения
//  Подключение обработчика событий к кнопке увеличения масштаба изображения
increaseImageScale.addEventListener('click', function () {
  var currentIntegerScaleValue = Math.min(parseInt(currentImageScale.value, DECIMAL_BASE) + changeImageScaleStep, maxImageScale);
  setAndDisplayImageScaleValue(currentIntegerScaleValue);
});
//  Подключение обработчика событий к кнопке уменьшения масштаба изображения
decreaseImageScale.addEventListener('click', function () {
  var currentIntegerScaleValue = Math.max(parseInt(currentImageScale.value, DECIMAL_BASE) - changeImageScaleStep, minImageScale);
  setAndDisplayImageScaleValue(currentIntegerScaleValue);
});
