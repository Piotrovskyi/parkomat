const router = require('express').Router();
const { Deposit, User } = require('model');
const { liqPay, sendNotification } = require('utils');

router.post('/', function(req, res) {
  const { data, signature } = req.body;

  const deposit = liqPay.getValidPayment(data, signature);

  if(deposit) {
    Deposit
      .update({ status: 1 }, { where: { id: deposit.order_id } })
      .then(() => Deposit.findById(deposit.order_id))
      .then(deposit => {
        let newBalance = 0;
        return User
          .findById(deposit.userId)
          .then(user => {
            newBalance = user.balance + deposit.amount;
            return user.update({ balance: newBalance });
          })
          .then(() => {
            const notification = `Your balance was replenished by ${deposit.amount} UAH`;
            sendNotification(deposit.userId, notification, {type: 'add-deposit', amount: newBalance});
          });
      })
      .then(() => res.sendStatus(200));
  } else {
    res.status(404).json({ error: 'Payment not found!' });
  }
});

module.exports = router;
