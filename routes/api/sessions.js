const router = require('express').Router();
const { Session, Car } = require('model');

router.get('/', function(req, res) {
  Session.findAll({include: [{model: Car, as: 'car'}]}).then(sessions => res.json(sessions));
});

router.get('/:id', function(req, res) {
  const { id } = req.params;
  Session.findById(id).then(session => {
    if (session) {
      res.json(session);
    } else {
      res.status(404).json({ error: 'Session not found!' });
    }
  });
});

module.exports = router;
