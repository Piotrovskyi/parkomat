const router = require('express').Router();
const { Parking, Session, Car } = require('model');

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

const addCarsToParking = parking => {
  parking = parking.toJSON();
  parking.actualCars = parking.sessions
    .filter(session => !session.closedAt)
    .map(session => session.car);
  delete parking.sessions;
  return parking;
};

router.get('/', function(req, res) {
  Parking
    .findAll(query)
    .then(parkings => parkings.map(addCarsToParking))
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
