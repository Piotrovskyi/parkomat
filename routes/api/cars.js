const router = require('express').Router();
const { Car } = require('model');
const { setParkingGreenStatus } = require('utils');

router.get('/', function(req, res) {
  Car.findAll().then(cars => res.json(cars));
});

router.get('/:id', function(req, res) {
  const { id } = req.params;
  Car.findById(id).then(car => {
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ error: 'Car not found!' });
    }
  });
});

router.get('/set-green-status', function(req, res) {
  setParkingGreenStatus();
});

module.exports = router;
