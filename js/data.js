'use strict';
(function () {
  var offerGeneration = function (oneOffer) {

    var offerObject = {
      author: {},
      offer: {},
      location: {}
    };

    offerObject.author.avatar = oneOffer.author.avatar;
    offerObject.offer.title = oneOffer.offer.title;
    offerObject.offer.address = oneOffer.offer.address + ',' + oneOffer.offer.address;
    offerObject.offer.price = oneOffer.offer.price + '/Руб';
    offerObject.offer.type = oneOffer.offer.type;
    offerObject.offer.rooms = oneOffer.offer.rooms;
    offerObject.offer.guests = oneOffer.offer.guests;
    offerObject.offer.checkin = oneOffer.offer.checkin;
    offerObject.offer.checkout = oneOffer.offer.checkout;
    offerObject.offer.features = oneOffer.offer.features;
    offerObject.offer.description = oneOffer.offer.description;
    offerObject.offer.photos = oneOffer.offer.photos;
    offerObject.location.x = oneOffer.location.x - 25;
    offerObject.location.y = oneOffer.location.y - 70;

    return offerObject;
  };

  window.data = {
    offersArrayGeneration: function (offerNumber, offer) {
      var offersArray = [];
      for (var z = 0; z < offerNumber; z++) {
        offersArray[z] = offerGeneration(offer[z]);
      }
      return offersArray;
    }
  };
})();
