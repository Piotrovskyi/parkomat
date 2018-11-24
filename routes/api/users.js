const router = require('express').Router();
const { User, Deposit, Payment } = require('model');

const removeToken = user => {
  user = user.toJSON();
  delete user.authorizationToken;
  return user;
};

router.get('/', function(req, res) {
  User
    .findAll()
    .then(users => users.map(user => removeToken(user)))
    .then(users => res.json(users));
});

router.get('/:id', function(req, res) {
  const { id } = req.params;

  User
    .findById(id)
    .then(user => removeToken(user))
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found!' });
      }
    });
});

router.get('/:id/deposits', function(req, res) {
  const { id } = req.params;

  Deposit
    .findAll({ where: { userId: id } })
    .then(deposits => res.json(deposits));
});

router.get('/:id/payments', function(req, res) {
  const { id } = req.params;

  Payment
    .findAll({ where: { userId: id } })
    .then(payments => res.json(payments));
});


module.exports = router;
