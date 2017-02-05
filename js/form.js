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
//  Максимально возможный масштаб изображения
var maxImageScale = 100;
//  Минимально возможный масштаб изображения
var minImageScale = 25;
//  Шаг изменения масштаба изображения
var changeImageScaleStep = 25;

/**
 * Функция, показывающая/скрывающая форму кадрирования изображения
 * @param {string} className - класс для сокрытия блока
 */
function toggleUploadOverlay(className) {
  uploadForm.classList.toggle(className);
  uploadOverlay.classList.toggle(className);
}

/**
 * Функция, устанавливающая начальное значение масштаба изображения
 * @param {number} defaultImageScale - значение масштаба по умолчанию, в процентах
 * @param {number} percent - делитель, нужный для перевода значения процентов в доли целого
 * @param {number} base - основание системы счисления
 */
function setInitialImageScale(defaultImageScale, percent, base) {
  currentImageScale.value = defaultImageScale.toString(base) + '%';
  imagePreview.style.transform = 'scale(' + (defaultImageScale / percent).toString(base) + ')';
}

/**
 * Функция устанавливает текущий масштаб изображения и отображает значение масштаба в форме кадрирования
 * @param {number} scale - текущий масштаб изображения, в процентах
 * @param {number} percent - делитель, нужный для перевода значения процентов в доли целого
 * @param {number} base - основание системы счисления
 */
function setAndDisplayImageScaleValue(scale, percent, base) {
  currentImageScale.value = scale.toString(base) + '%';
  imagePreview.style.transform = 'scale(' + (scale / percent).toString(base) + ')';
}

//  Подключение обработчика событий при изменении статуса поля загрузки изображения
uploadFormInput.addEventListener('change', function () {
  toggleUploadOverlay('invisible');
  setInitialImageScale(50, 100, 10);
});
//  Подключение обработчика событий к кнопке закрытия формы кадрирования изображения
uploadCancel.addEventListener('click', function () {
  toggleUploadOverlay('invisible');
});
//  Подключение обработчика событий к радиобаттонам фильтров
for (var i = 0, length = filterToggle.length; i < length; i++) {
  filterToggle[i].addEventListener('change', function (event) {
    imagePreview.className = 'filter-image-preview';
    imagePreview.classList.add('filter-' + event.target.value);
  });
}
//  Управление масштабом изображения
//  Подключение обработчика событий к кнопке увеличения масштаба изображения
increaseImageScale.addEventListener('click', function () {
  var currentIntegerScaleValue = Math.min(parseInt(currentImageScale.value, 10) + changeImageScaleStep, maxImageScale);
  setAndDisplayImageScaleValue(currentIntegerScaleValue, 100, 10);
});
//  Подключение обработчика событий к кнопке уменьшения масштаба изображения
decreaseImageScale.addEventListener('click', function () {
  var currentIntegerScaleValue = Math.max(parseInt(currentImageScale.value, 10) - changeImageScaleStep, minImageScale);
  setAndDisplayImageScaleValue(currentIntegerScaleValue, 100, 10);
});
