const socket = require('./socket-connection');

module.exports = () => {
  console.log('set-parking-green-status 3');
  socket().emit('green');
};
