const router = require('express').Router();
const { Parking } = require('model');

router.get('/', function(req, res) {
  Parking.findAll().then(parkings => res.json(parkings));
});

router.get('/:id', function(req, res) {
  const { id } = req.params;
  Parking.findByPk(id).then(parking => {
    if (parking) {
      res.json(parking)
    } else {
      res.status(404).json({ error: 'Parking not found!' });
    }
  });
});

module.exports = router;
