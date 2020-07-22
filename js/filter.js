'use strict';
(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var MAX_ARRAY_LENGTH = 5;

  window.mapFilter = document.querySelector('.map__filters');
  var filterHousingType = window.mapFilter.querySelector('#housing-type');
  var filterHousingPrice = window.mapFilter.querySelector('#housing-price');
  var filterHousingRooms = window.mapFilter.querySelector('#housing-rooms');
  var filterHousingGuests = window.mapFilter.querySelector('#housing-guests');
  var filterWifi = window.mapFilter.querySelector('#filter-wifi');
  var filterDishwasher = window.mapFilter.querySelector('#filter-dishwasher');
  var filterParking = window.mapFilter.querySelector('#filter-parking');
  var filterWasher = window.mapFilter.querySelector('#filter-washer');
  var filterElevator = window.mapFilter.querySelector('#filter-elevator');
  var filterConditioner = window.mapFilter.querySelector('#filter-conditioner');

  var filterFragmentPins = document.createDocumentFragment();
  var filterFragmentCards = document.createDocumentFragment();

  window.filterPins = function () {
    window.mapFilter.addEventListener('change', function () {
      var typeValue = filterHousingType.value;
      var priceValue = filterHousingPrice.value;
      var roomsValue = filterHousingRooms.value;
      var guestsValue = filterHousingGuests.value;

      var newArray = [];

      for (var k = 0; k < window.findings.length; k++) {
        if (typeValue !== 'any' && window.findings[k].offer.type !== typeValue) {
          continue;
        }

        if (priceValue !== 'any') {
          switch (priceValue) {
            case 'middle':
              if (window.findings[k].offer.price < MIN_PRICE || window.findings[k].offer.price > MAX_PRICE) {
                continue;
              }
              break;
            case 'low':
              if (window.findings[k].offer.price > MIN_PRICE) {
                continue;
              }
              break;
            case 'high':
              if (window.findings[k].offer.price < MAX_PRICE) {
                continue;
              }
              break;
          }
        }

        if (roomsValue !== 'any') {
          switch (roomsValue) {
            case '1':
              if (window.findings[k].offer.rooms !== 1) {
                continue;
              }
              break;
            case '2':
              if (window.findings[k].offer.rooms !== 2) {
                continue;
              }
              break;
            case '3':
              if (window.findings[k].offer.rooms !== 3) {
                continue;
              }
              break;
          }
        }

        if (guestsValue !== 'any') {
          switch (guestsValue) {
            case '2':
              if (window.findings[k].offer.guests !== 2) {
                continue;
              }
              break;
            case '1':
              if (window.findings[k].offer.guests !== 1) {
                continue;
              }
              break;
            case '0':
              if (window.findings[k].offer.guests !== 0) {
                continue;
              }
              break;
          }
        }

        if (filterWifi.checked) {
          if (window.findings[k].offer.features.includes('wifi') === false) {
            continue;
          }
        }
        if (filterDishwasher.checked) {
          if (window.findings[k].offer.features.includes('dishwasher') === false) {
            continue;
          }
        }
        if (filterParking.checked) {
          if (window.findings[k].offer.features.includes('parking') === false) {
            continue;
          }
        }
        if (filterWasher.checked) {
          if (window.findings[k].offer.features.includes('washer') === false) {
            continue;
          }
        }
        if (filterElevator.checked) {
          if (window.findings[k].offer.features.includes('elevator') === false) {
            continue;
          }
        }
        if (filterConditioner.checked) {
          if (window.findings[k].offer.features.includes('conditioner') === false) {
            continue;
          }
        }

        newArray.push(window.findings[k]);

        if (newArray.length > 4) {
          break;
        }
      }

      var customAdding = function () {
        window.map.removalPins();
        window.map.removalCards();
        if (newArray.length > MAX_ARRAY_LENGTH) {
          while (newArray.length !== 5) {
            newArray.pop();
          }
        }
        for (var q = 0; q < newArray.length; q++) {
          filterFragmentPins.appendChild(window.pin.markerGeneration(window.data.offersArrayGeneration(newArray.length, newArray), newArray.length)[q]);
        }
        window.pin.mapPinsList.appendChild(filterFragmentPins);
        for (var j = 0; j < newArray.length; j++) {
          filterFragmentCards.appendChild(window.cardGeneration(window.data.offersArrayGeneration(newArray.length, newArray))[j]);
        }
        window.map.map.insertBefore(filterFragmentCards, window.form.mapFilter);
        window.showCard.cardOpen();
      };

      window.debounce(customAdding);
    });
  };
})();
