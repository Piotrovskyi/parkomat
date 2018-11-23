const router = require('express').Router();
const { User } = require('model');

router.get('/', function(req, res) {
  User.findAll().then(users => res.json(users));
});

router.get('/:id', function(req, res) {
  const { id } = req.params;
  User.findByPk(id).then(user => {
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: 'User not found!' });
    }
  });
});

module.exports = router;
