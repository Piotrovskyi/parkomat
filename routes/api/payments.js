const router = require('express').Router();
const { Payment } = require('model');

router.get('/', function(req, res) {
  Payment
    .findAll()
    .then(payments => res.json(payments));
});

router.get('/:id', function(req, res) {
  const { id } = req.params;

  Payment
    .findById(id)
    .then(payment => {
      if (payment) {
        res.json(payment);
      } else {
        res.status(404).json({ error: 'Payment not found!' });
      }
    });
});

module.exports = router;
