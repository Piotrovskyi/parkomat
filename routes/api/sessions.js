const router = require('express').Router();
const { Session, Car, Parking, User, Payment } = require('model');
const moment = require('moment');
const getTimeOffset = require('../../utils/get-time-offset');
const sendNotification = require('../../utils/send-notification');

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

router.post('/', async (req, res) => {
  const { numbers, parkingId = 1 } = req.body;
  if(numbers) {
    const numbersArray = numbers.split('/n');
    const parking = await Parking.findById(parkingId);
    const existingCar = await Car.findOne({
      include: [{ model: Session, as: 'sessions' }],
      where: {
        number: numbersArray[0],
      },
    });

    if(!existingCar) {
      console.log('Car does not exist');
      return;
    }

    const lastSession = existingCar.sessions[existingCar.sessions.length - 1];
    const currentTime = moment(new Date()).unix();
    if(!lastSession || (lastSession && lastSession.closedAt)) {
      await Session.create({
        carId: existingCar.id,
        openedAt: currentTime,
        parkingId,
      });
      sendNotification(existingCar.userId, `You have parked at ${parking.title} parking`, { type: 'park-start'});
    } else if(lastSession && !lastSession.closedAt) {
      const offset = getTimeOffset(lastSession.openedAt, currentTime);
      const timeoutMinutes = 1;
      if(offset > timeoutMinutes) {
        const cost = (parking.price / 60) * offset;
        const costRounded = Math.round(cost);
        await Session.update({
          closedAt: currentTime,
          cost: costRounded,
          paid: true,
        }, { where: { id: lastSession.id }});
        const user = await User.findById(existingCar.userId);
        await user.update({ balance: user.balance - costRounded });
        await Payment.create({
          userId: user.id,
          carId: existingCar.id,
          parkingId: parking.id,
          amount: costRounded,
          createdAt: currentTime
        });
        sendNotification(existingCar.userId, `You have been charged ${costRounded} for staying at ${parking.title}`, { type: 'park-end', costRounded});
      }
    }
  }
});

module.exports = router;
