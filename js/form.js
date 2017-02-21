'use strict';

(function () {
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

  //  Функция закрытия формы кадрирования изображения
  var cancelHandler = function () {
    toggleUploadOverlay(hiddenElementClass, !VISIBILITY_FLAG);
  };

  //  Функция показа формы кадрирования после загрузки изображения
  var uploadHandler = function () {
    //  Показ формы кадрирования изображения
    toggleUploadOverlay(hiddenElementClass, VISIBILITY_FLAG);
    //  Установка масштабу изображения значения по умолчанию
    window.initializeScale.resetScale(defaultImageScale, imagePreview);
    //  Установка фильтру изображения значения по умолчанию
    window.initializeFilters.resetFilters(filterControls, defaultFilterValue, imagePreview, imagePreviewClass);
  };

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
      uploadCancel.addEventListener('click', cancelHandler);
      //  Подключение обработчика для закрытия формы кадрирования при нажатии ESCAPE
      document.addEventListener('keydown', closeUploadOverlayOnEscape);
      //  Активация фильтров
      window.initializeFilters.activateFilters(filterControls, imagePreview, imagePreviewClass);
      //  Активация изменения масштаба изображения
      window.initializeScale.activateScale(scaleControl, changeImageScaleStep, imagePreview);
      //  Удаление обработчика для показа формы кадрирования при загрузке изображения
      uploadFormInput.removeEventListener('change', uploadHandler);
    } else {
      uploadCancel.setAttribute('aria-pressed', 'true');
      uploadCancel.removeEventListener('click', cancelHandler);
      //  Удаление обработчика для закрытия формы кадрирования при нажатии ESCAPE
      document.removeEventListener('keydown', closeUploadOverlayOnEscape);
      //  Деактивация фильтров
      window.initializeFilters.deactivateFilters(filterControls);
      //  Деактивация управления масштабом
      window.initializeScale.deactivateScale(scaleControl);
      //  Подключение обработчика для показа формы кадрирования при загрузке изображения
      uploadFormInput.addEventListener('change', uploadHandler);
    }
  }

  //  Функция, скрывающая форму кадрирования при нажатии клавиши ESCAPE
  function closeUploadOverlayOnEscape(event) {
    if (window.utils.isDeactivateEvent(event)) {
      toggleUploadOverlay(hiddenElementClass, !VISIBILITY_FLAG);
    }
  }

  //  Подключение обработчика событий для показа формы кадрирования при загрузке изображения
  uploadFormInput.addEventListener('change', uploadHandler);
})();
