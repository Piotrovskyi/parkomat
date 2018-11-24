const router = require('express').Router();
const { Deposit } = require('model');

router.get('/', function(req, res) {
  Deposit
    .findAll()
    .then(deposits => res.json(deposits));
});

router.get('/:id', function(req, res) {
  const { id } = req.params;

  Deposit
    .findById(id)
    .then(deposit => {
      if (deposit) {
        res.json(deposit);
      } else {
        res.status(404).json({ error: 'Deposit not found!' });
      }
    });
});

module.exports = router;
