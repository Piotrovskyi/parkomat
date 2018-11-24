const { User } = require('model');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  User
    .find({ where: { authorizationToken: authorization } })
    .then(user => {
      req.currentUser = user ? user.toJSON() : null;
      next();
    }, () => next());
};
