const router = require('express').Router();
const { Parking, Session, Car } = require('model');

const query = {
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

router.get('/', function(req, res) {
  Parking
    .findAll(query)
    .then(parkings => res.json(parkings));
});

router.get('/:id', function(req, res) {
  const { id } = req.params;
  Parking
    .findById(id, query)
    .then(parking => {
      if (parking) {
        res.json(parking);
      } else {
        res.status(404).json({ error: 'Parking not found!' });
      }
  });
});

module.exports = router;
