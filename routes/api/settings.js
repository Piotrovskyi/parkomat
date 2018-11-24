const router = require('express').Router();
const { Setting } = require('model');

router.get('/', function(req, res) {
  Setting.findAll().then(settings => res.json(settings));
});

router.get('/:name', function(req, res) {
  const { name } = req.params;
  Setting.findOne({ where: { name } }).then(setting => {
    if (setting) {
      res.json(setting);
    } else {
      res.status(404).json({ error: 'Setting not found!' });
    }
  });
});

router.put('/:name', function(req, res) {
  const { name } = req.params;
  const { value } = req.body;

  Setting.update({ value }, { where: { name } }).then(() => res.end());
});

module.exports = router;
