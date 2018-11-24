const router = require('express').Router();
const { Parking, Session, Car } = require('model');

const query = {
  // attributes: [['sessions.paid', 's']],
  include: [
    {
      model: Session,
      as: 'sessions',
      where: {
        closedAt: 0
      },
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
  // parking.cars = parking.sessions.map(session => session.car);
  parking.asd = 2;
  return parking;
};

router.get('/', function(req, res) {
  Parking
    .findAll(query)
    .then(parkings => {
      parkings[0].qwe = 2;
      return parkings;
    })
    .then(parkings => res.json(parkings));
});

router.get('/:id', function(req, res) {
  const { id } = req.params;
  Parking
    .findById(id, query)
    .then(parking => {
      return parking;
    })
    .then(parking => {
      if (parking) {
        res.json(parking);
      } else {
        res.status(404).json({ error: 'Parking not found!' });
      }
  });
});

module.exports = router;
