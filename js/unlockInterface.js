'use strict';
(function () {
  var ENTER_BUTTON = 'Enter';

  window.mainPin = document.querySelector('.map__pin--main');

  var unlockInterface = function () {
    for (var z = 0; z < window.form.formFieldsets.length; z++) {
      window.form.formFieldsets[z].removeAttribute('disabled');
    }
    for (var g = 0; g < window.form.formFilters.length; g++) {
      window.form.formFilters[g].removeAttribute('disabled');
    }
    window.map.map.classList.remove('map--faded');
    window.form.form.classList.remove('ad-form--disabled');
  };

  window.lockInterface = function () {
    for (var z = 0; z < window.form.formFieldsets.length; z++) {
      window.form.formFieldsets[z].setAttribute('disabled', 'disabled');
    }
    for (var g = 0; g < window.form.formFilters.length; g++) {
      window.form.formFilters[g].setAttribute('disabled', 'disabled');
    }
    window.map.map.classList.add('map--faded');
    window.form.form.classList.add('ad-form--disabled');
  };

  var onSuccess = function () {
    activetedInterface();
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: #ffffff';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '16px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var activetedInterface = function () {
    unlockInterface();
    if (window.pin.mapPinsList.children.length === 2) {
      window.filterPins();
      window.map.addingPins();
      window.map.addingCards();
      window.showCard.cardOpen();
    }
    window.form.mainPinCoordinates();
  }

  function onPinMainClick(e) {
    switch (e.button) {
      case 0:
        window.load(onSuccess, onError);
    }
  }

  function onPinMainKeydown(q) {
    if (q.key === ENTER_BUTTON) {
      window.load(onSuccess, onError);
    }
  }

  window.mainPin.addEventListener('mousedown', onPinMainClick);
  window.mainPin.addEventListener('keydown', onPinMainKeydown);

  window.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var limits = {
      top: 130,
      right: window.map.map.offsetWidth + window.map.map.offsetLeft - window.mainPin.offsetWidth,
      bottom: 630,
      left: window.map.map.offsetLeft
    };

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.form.mainPinCoordinates();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newX = window.mainPin.offsetLeft - shift.x;
      var newY = window.mainPin.offsetTop - shift.y;

      if (startCoords.x < limits.left) {
        newX = 0;
      }
      if (startCoords.x > limits.right) {
        newX = 1135;
      }
      if (startCoords.y < limits.top) {
        newY = 130;
      }
      if (startCoords.y > limits.bottom) {
        newY = 630;
      }

      window.mainPin.style.top = newY + 'px';
      window.mainPin.style.left = newX + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
