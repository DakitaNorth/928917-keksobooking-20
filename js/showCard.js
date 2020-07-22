'use strict';
(function () {
  window.ESC_BUTTON = 27;

  window.showCard = {
    cardOpen: function () {
      var pinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var cardsCollecton = document.querySelectorAll('.map__card');
      var closeButton = document.querySelectorAll('.popup__close');


      var utilClose = function (array) {
        for (var i = 0; i < array.length; i++) {
          array[i].classList.add('hidden');
        }
      };

      var utilPinStyle = function (array) {
        for (var i = 0; i < array.length; i++) {
          array[i].classList.remove('map__pin--active');
        }
      };

      utilClose(cardsCollecton);

      var onPressEscDown = function (evt) {
        if (evt.keyCode === window.ESC_BUTTON) {
          utilClose(cardsCollecton);
          window.removeEventListener('keydown', onPressEscDown);
        }
      };

      for (var h = 0; h < pinsCollection.length; h++) {
        pinsCollection[h].addEventListener('click', function (index) {
          utilClose(cardsCollecton);
          utilPinStyle(pinsCollection);
          pinsCollection[index].classList.add('map__pin--active');
          cardsCollecton[index].classList.remove('hidden');
          window.addEventListener('keydown', onPressEscDown);
        }.bind(null, h)
        );
      }

      for (var s = 0; s < closeButton.length; s++) {
        closeButton[s].addEventListener('click', function (index) {
          cardsCollecton[index].classList.add('hidden');
        }.bind(null, s)
        );
      }
    },
    utilClose: function (array) {
      for (var i = 0; i < array.length; i++) {
        array[i].classList.add('hidden');
      }
    }
  };
})();
