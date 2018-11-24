const router = require('express').Router();
const { Deposit, User } = require('model');
const { liqPay } = require('utils');

router.post('/', function(req, res) {

  console.log('#################### 1');

  const { data, signature } = req.body;

  console.log('#################### data 2', data);
  console.log('####################  signature 2', signature);

  const deposit = liqPay.getValidPayment(data, signature);

  console.log('#################### 3 deposit', deposit);

  if(deposit) {
    Deposit
      .update({ status: 1 }, { where: { id: deposit.order_id } })
      .then(() => Deposit.findById(deposit.order_id))
      .then(deposit => {
        console.log();
        return User
          .findById(deposit.userId)
          .then(user => user.update({ balance: user.balance + deposit.amount }));
      })
      .then(() => res.sendStatus(200));
  } else {
    res.status(404).json({ error: 'Payment not found!' });
  }
});

module.exports = router;
