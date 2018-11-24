const router = require('express').Router();
const { Deposit } = require('model');
const { liqPay } = require('utils');

router.post('/', function(req, res) {

  console.log('#################### 1');

  const { data, signature } = req.body;

  console.log('#################### 2');

  const deposit = liqPay.getValidPayment(data, signature);

  console.log('#################### 3 deposit', deposit);

  if(deposit) {
    Deposit
      .update({ status: 1 }, { where: { id: deposit.id } })
      .then(() => res.sendStatus(200));
  } else {
    res.status(404).json({ error: 'Payment not found!' });
  }
});

module.exports = router;
