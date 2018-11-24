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

        User
          .update({ authorizationToken }, { where: { id: user.id } })
          .then(() => res.json({ authorizationToken }));
      } else {
        res.status(404).json({ error: 'User not found!' });
      }
    });
});

router.post('/notificationsToken', function(req, res) {
  const { id } = req.currentUser;
  const { token } = req.body;

  User
    .findById(id)
    .then(user => {
      if (user) {
        // User
        //   .update({ notificationsToken: token }, { where: { id } })
        //   .then(() => res.json(Object.assign(user, { notificationsToken: token })));
        res.json({qwe: 123});
      } else {
        res.status(404).json({ error: 'User not found!' });
      }
    });
});

module.exports = router;
