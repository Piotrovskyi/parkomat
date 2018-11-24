const router = require('express').Router();
const { Car } = require('model');

const { sendNotification } = require('utils');

router.get('/', function(req, res) {
  sendNotification(2, 'test message', { qwe: 'rty' });

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

module.exports = router;
