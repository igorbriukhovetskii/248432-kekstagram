'use strict';

(function () {
  //  Форма загрузки изображения
  var uploadForm = document.querySelector('#upload-select-image');
  //  Поле загрузки изображения в форме
  var uploadFormInput = uploadForm.querySelector('#upload-file');
  //  Блок с формой кадрирования изображения
  var uploadOverlay = document.querySelector('.upload-overlay');
  //  Кнопка закрытия блока с формой кадрирования изображения
  var uploadCancelButton = uploadOverlay.querySelector('#upload-cancel');
  //  Блок фильтров изображения
  var filterControls = uploadOverlay.querySelector('.upload-filter-controls');
  //  Значение фильтра по умолчанию
  var defaultFilterValue = 'none';
  //  Предпросмотр изображения
  var imagePreview = uploadOverlay.querySelector('.filter-image-preview');
  //  Блок управления масштабом изображения
  var scaleControl = uploadOverlay.querySelector('.upload-resize-controls');
  //  Масштаб изображения по умолчанию
  var DEFAULT_IMAGE_SCALE = 100;
  //  Шаг изменения масштаба изображения
  var SCALE_STEP = 25;

  //  Переменные, хранящие имена классов CSS
  //  Класс изображения с предпросмотром эффектов наложения фильтра и кадрирования
  var imagePreviewClass = 'filter-image-preview';
  //  Класс скрытого блока
  var hiddenElementClass = 'invisible';

  //  Флаг, определяющий видимость блока с формой кадрирования
  var VISIBILITY_FLAG = true;

  //  Функция закрытия формы кадрирования изображения
  var onUploadCancelButtonClick = function () {
    toggleUploadOverlay(hiddenElementClass, !VISIBILITY_FLAG);
  };

  // Обработчик изменения насыщенности CSS-фильтра
  var onSaturationChange = function () {
    window.saturate();
  };

  /**
   * Call-back функция изменения масштаба изображения
   * @param {number} scale - текущее значение, вычесленное модулем initialize-scale;
   */
  var onScaleChange = function (scale) {
    imagePreview.style.transform = 'scale(' + (scale / 100) + ')';
  };

  /**
   * Call-back функция изменения CSS-фильтра, применённого к изображению
   * @param {string} filter - текущее значение фильтра, полученное модулем initialize-filters
   */
  var onFilterChange = function (filter) {
    imagePreview.className = imagePreviewClass;
    imagePreview.classList.add('filter-' + filter);
    if (filter === 'none') {
      window.slider.hide();
    } else {
      window.slider.show();
    }
    document.addEventListener('mousemove', onSaturationChange);
    window.saturate();
  };

  //  Функция показа формы кадрирования после загрузки изображения
  var onUploadFormInputChange = function () {
    //  Показ формы кадрирования изображения
    toggleUploadOverlay(hiddenElementClass, VISIBILITY_FLAG);
    //  Установка масштабу изображения значения по умолчанию
    window.initializeScale.resetScale(DEFAULT_IMAGE_SCALE, scaleControl, onScaleChange);
    //  Установка фильтру изображения значения по умолчанию
    window.initializeFilters.reset(filterControls, defaultFilterValue, onFilterChange);
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
      uploadCancelButton.setAttribute('aria-pressed', 'false');
      uploadCancelButton.addEventListener('click', onUploadCancelButtonClick);
      //  Подключение обработчика для закрытия формы кадрирования при нажатии ESCAPE
      document.addEventListener('keydown', onCloseByEscape);
      //  Активация фильтров
      window.initializeFilters.activate(filterControls, onFilterChange);
      window.saturate();
      //  Активация изменения масштаба изображения
      window.initializeScale.activateScale(scaleControl, SCALE_STEP, onScaleChange);
      //  Удаление обработчика для показа формы кадрирования при загрузке изображения
      uploadFormInput.removeEventListener('change', onUploadFormInputChange);
    } else {
      uploadCancelButton.setAttribute('aria-pressed', 'true');
      uploadCancelButton.removeEventListener('click', onUploadCancelButtonClick);
      //  Удаление обработчика для закрытия формы кадрирования при нажатии ESCAPE
      document.removeEventListener('keydown', onCloseByEscape);
      //  Деактивация фильтров
      window.initializeFilters.deactivate(filterControls);
      //  Удаление обработчика изменения насыщенности CSS-фильтров
      document.removeEventListener('mousemove', onSaturationChange);
      //  Деактивация управления масштабом
      window.initializeScale.deactivateScale(scaleControl);
      //  Подключение обработчика для показа формы кадрирования при загрузке изображения
      uploadFormInput.addEventListener('change', onUploadFormInputChange);
    }
  }

  //  Функция, скрывающая форму кадрирования при нажатии клавиши ESCAPE
  function onCloseByEscape(event) {
    if (window.utils.isDeactivateEvent(event)) {
      toggleUploadOverlay(hiddenElementClass, !VISIBILITY_FLAG);
    }
  }

  //  Подключение обработчика событий для показа формы кадрирования при загрузке изображения
  uploadFormInput.addEventListener('change', onUploadFormInputChange);
})();
