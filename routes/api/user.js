const md5 = require('js-md5');
const moment = require('moment');
const router = require('express').Router();
const { Deposit, Payment, User, Car } = require('model');
const { liqPay } = require('utils');

router.get('/', function(req, res) {
  const { id } = req.currentUser;

  User
    .findById(id)
    .then(user => res.json(user));
});

router.get('/deposits', function(req, res) {
  const { id } = req.currentUser;

  Deposit
    .findAll({ where: { userId: id, status: true } })
    .then(deposits => res.json(deposits));
});

router.get('/payments', function(req, res) {
  const { id } = req.currentUser;

  Payment
    .findAll({ where: { userId: id } })
    .then(payments => res.json(payments));
});

router.post('/login', function(req, res) {
  const { login, password } = req.body;

  User
    .find({ where: { login, password } })
    .then(user => {
      if (user) {
        const authorizationToken = md5(`${new Date().getTime()}`);

        user.update({ authorizationToken }).then(() => res.json({ authorizationToken }));
      } else {
        res.status(404).json({ error: 'User not found!' });
      }
    });
});

router.post('/registration', function(req, res) {
  const { login, password, carNumber } = req.body;

    User.create({
      type: 0,
      login,
      password
    }).then(user => {
      Car.create({ userId: user.get('id'), number: carNumber })
        .then(() => res.json({}));
    });
});

router.post('/notificationsToken', function(req, res) {
  const { id } = req.currentUser;
  const { token: notificationsToken } = req.body;

  User
    .findById(id)
    .then(user => {
      if (user) {
        user.update({ notificationsToken }).then(() => res.json({ notificationsToken }));
      } else {
        res.status(404).json({ error: 'User not found!' });
      }
    });
});

router.post('/deposits', function(req, res) {
  const { id } = req.currentUser;
  const { amount } = req.body;

  Deposit.create({
    userId: id,
    status: 0,
    amount,
    createdAt: moment(new Date()).unix()
  }).then(deposit => {
    res.json({ link: liqPay.generatePayLink(id, amount, deposit.get('id')) });
  });
});

module.exports = router;
