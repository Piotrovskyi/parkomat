const md5 = require('js-md5');
const router = require('express').Router();
const { User } = require('model');

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

module.exports = router;
