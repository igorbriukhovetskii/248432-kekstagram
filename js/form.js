'use strict';
//  Форма загрузки изображения
var uploadForm = document.querySelector('#upload-select-image');
//  Поле загрузки изображения в форме
var uploadFormInput = uploadForm.querySelector('#upload-file');
//  Блок с формой кадрирования изображения
var uploadOverlay = document.querySelector('.upload-overlay');
//  Кнопка закрытия блока с формой кадрирования изображения
var uploadCancel = uploadOverlay.querySelector('#upload-cancel');
//  Блок фильтров изображения
var filterControls = uploadOverlay.querySelector('.upload-filter-controls');
//  Значение фильтра по умолчанию
var defaultFilterValue = 'none';
//  Предпросмотр изображения
var imagePreview = uploadOverlay.querySelector('.filter-image-preview');
//  Блок управления масштабом изображения
var scaleControl = uploadOverlay.querySelector('.upload-resize-controls');
//  Масштаб изображения по умолчанию
var defaultImageScale = 100;
//  Шаг изменения масштаба изображения
var changeImageScaleStep = 25;

//  Переменные, хранящие имена классов CSS
//  Класс изображения с предпросмотром эффектов наложения фильтра и кадрирования
var imagePreviewClass = 'filter-image-preview';
//  Класс скрытого блока
var hiddenElementClass = 'invisible';

//  Флаг, определяющий видимость блока с формой кадрирования
var VISIBILITY_FLAG = true;

/**
 * Функция, показывающая/скрывающая форму кадрирования изображения
 * @param {string} className - класс для сокрытия блока
 * @param {boolean} overlayVisibility - статус видимости формы кадрирования после срабатывания функции
 */
function toggleUploadOverlay(className, overlayVisibility) {
  uploadForm.classList.toggle(className, overlayVisibility);
  uploadOverlay.classList.toggle(className, !overlayVisibility);
  if (overlayVisibility) {
    uploadCancel.setAttribute('aria-pressed', 'false');
    document.addEventListener('keydown', closeUploadOverlayOnEscape);
  } else {
    uploadCancel.setAttribute('aria-pressed', 'true');
    document.removeEventListener('keydown', closeUploadOverlayOnEscape);
  }
}
//  Функция, скрывающая форму кадрирования при нажатии клавиши ESCAPE
function closeUploadOverlayOnEscape(event) {
  if (window.utils.isKeyPressed(event, window.utils.ESCAPE_KEY_CODE)) {
    toggleUploadOverlay(hiddenElementClass, !VISIBILITY_FLAG);
  }
}
//  Подключение обработчика событий при изменении статуса поля загрузки изображения
uploadFormInput.addEventListener('change', function () {
  //  Показ формы кадрирования изображения
  toggleUploadOverlay(hiddenElementClass, VISIBILITY_FLAG);
  //  Установка масштабу изображения значения по умолчанию
  window.setAndDisplayImageScaleValue(defaultImageScale);
  //  Установка фильтру изображения значения по умолчанию
  window.resetFilterToDefault(defaultFilterValue, imagePreview, imagePreviewClass);
});
//  Инициализация управления масштабом изображения
window.initializeScale(scaleControl, changeImageScaleStep, defaultImageScale, imagePreview);
//  Инициализация фильтров изображения
window.initializeFilters(filterControls, imagePreview, imagePreviewClass);
//  Подключение обработчика событий к кнопке закрытия формы кадрирования изображения
uploadCancel.addEventListener('click', function () {
  toggleUploadOverlay(hiddenElementClass, !VISIBILITY_FLAG);
});
