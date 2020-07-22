'use strict';
(function () {
  window.PIN_NUMBER = 5;

  var map = document.querySelector('.map');
  var fragmentPins = document.createDocumentFragment();

  var fragmentCards = document.createDocumentFragment();

  window.map = {
    map: document.querySelector('.map'),
    addingPins: function () {
      for (var i = 0; i < window.PIN_NUMBER; i++) {
        fragmentPins.appendChild(window.pin.markerGeneration(window.data.offersArrayGeneration(window.PIN_NUMBER, window.findings), window.PIN_NUMBER)[i]);
      }
      window.pin.mapPinsList.appendChild(fragmentPins);
    },
    addingCards: function () {
      for (var z = 0; z < window.PIN_NUMBER; z++) {
        fragmentCards.appendChild(window.cardGeneration(window.data.offersArrayGeneration(window.PIN_NUMBER, window.findings))[z]);
      }
      map.insertBefore(fragmentCards, window.form.mapFilter);
    },
    removalPins: function () {
      var pinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pinsCollection.length; i++) {
        window.pin.mapPinsList.removeChild(pinsCollection[i]);
      }
    },
    removalCards: function () {
      var cardsCollecton = document.querySelectorAll('.map__card');
      for (var i = 0; i < cardsCollecton.length; i++) {
        map.removeChild(cardsCollecton[i]);
      }
    }
  };
})();
