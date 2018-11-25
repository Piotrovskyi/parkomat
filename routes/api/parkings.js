const router = require('express').Router();
const { Parking, Session, Car } = require('model');
const { addCarsToParking, addDistanceToParking } = require('utils');

const query = {
  include: [
    {
      model: Session,
      as: 'sessions',
      include: [
        {
          model: Car,
          as: 'car'
        }
      ]
    }
  ]
};

router.get('/', function(req, res) {
  Parking
    .findAll(query)
    .then(parkings => parkings.map(addCarsToParking))
    .then(parkings => res.json(parkings));
});

router.get('/:location', function(req, res) {
  const { location } = req.params;

  Parking
    .findAll(query)
    .then(parkings => parkings.map(addCarsToParking))
    .then(parkings => parkings.map(addDistanceToParking.bind(null, location)))
    .then(parkings => res.json(parkings));
});

router.get('/:id', function(req, res) {
  const { id } = req.params;
  Parking
    .findById(id, query)
    .then(parking => addCarsToParking(parking))
    .then(parking => {
      if (parking) {
        res.json(parking);
      } else {
        res.status(404).json({ error: 'Parking not found!' });
      }
  });
});

module.exports = router;
