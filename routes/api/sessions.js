const router = require('express').Router();
const { Session, Car, Parking, User, Payment } = require('model');
const moment = require('moment');
const { setParkingGreenStatus } = require('utils');
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
    console.log(numbers.toLowerCase().replace(/(\r\n\t|\n|\r\t)/gm,'').replace(/\s/g, ''));
    const parking = await Parking.findById(parkingId);
    const existingCar = await Car.findOne({
      include: [{ model: Session, as: 'sessions' }],
      where: {
        number: numbers.toLowerCase()
        .replace(/(\r\n\t|\n|\r\t)/gm,'')
        .replace(/\s/g, '')
        .split('UA').join(''),
      },
    });

    if(!existingCar) {
      console.log('Car does not exist');
      return res.json();
    }

    const lastSession = existingCar.sessions[existingCar.sessions.length - 1];
    const currentTime = moment(new Date()).unix();
    if(!lastSession || (lastSession && lastSession.closedAt)) {

      if(!lastSession) {
        await Session.create({
          carId: existingCar.id,
          openedAt: currentTime,
          parkingId,
        });
        setParkingGreenStatus();
        sendNotification(existingCar.userId, `You have parked at ${parking.title}`, { type: 'park-start'});
      } else if(lastSession && lastSession.closedAt) {
        const justWasOffset = getTimeOffset(lastSession.closedAt, currentTime);
        if(justWasOffset >= 1) {
          await Session.create({
            carId: existingCar.id,
            openedAt: currentTime,
            parkingId,
          });
          setParkingGreenStatus();
          sendNotification(existingCar.userId, `You have parked at ${parking.title}`, { type: 'park-start'});
        }
      }
    } else if(lastSession && !lastSession.closedAt) {
      const offset = getTimeOffset(lastSession.openedAt, currentTime);
      console.log(offset, lastSession.openedAt, currentTime, 'offset======>>>');
      const timeoutMinutes = 1;
      if(offset >= timeoutMinutes) {
        const cost = (parking.price / 60) * offset;
        const costRounded = Math.round(cost);
        await Session.update({
          closedAt: currentTime,
          cost: costRounded,
          paid: true,
        }, { where: { id: lastSession.id }});
        const user = await User.findById(existingCar.userId);
        const newBalance = user.balance - costRounded;
        await user.update({ balance: newBalance });
        await Payment.create({
          userId: user.id,
          carId: existingCar.id,
          parkingId: parking.id,
          amount: costRounded,
          createdAt: currentTime
        });
        setParkingGreenStatus();
        sendNotification(
          existingCar.userId,
          `You have been charged ${costRounded} UAH for staying at ${parking.title}`,
          { type: 'park-end', costRounded, newBalance }
        );
      }
    }
  }
  res.json({ sent: true });
});

module.exports = router;
