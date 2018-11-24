const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/parkings', require('./parkings'));
router.use('/cars', require('./cars'));
router.use('/sessions', require('./sessions'));
router.use('/deposits', require('./deposits'));
router.use('/payments', require('./payments'));
router.use('/user', require('./user'));
router.use('/pay-callback', require('./pay-callback'));

module.exports = router;
