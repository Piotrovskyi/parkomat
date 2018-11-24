const { Expo } = require('expo-server-sdk');
const { User } = require('model');

const expo = new Expo();

module.exports = (userId, body, data = {}) => User.findById(userId).then(user => {
  if (user) {
    const messages = [{
      to: user.notificationsToken,
      sound: 'default',
      body,
      data
    }];
    const chunks = expo.chunkPushNotifications(messages);
    const promises = [];

    for (let chunk of chunks) {
      try {
        promises.push(expo.sendPushNotificationsAsync(chunk));
      } catch (error) {
        console.error(error);
      }
    }

    return Promise.all(promises);
  }
});
