const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/parkings', require('./parkings'));
router.use('/cars', require('./cars'));
router.use('/sessions', require('./sessions'));
router.use('/settings', require('./settings'));

module.exports = router;
