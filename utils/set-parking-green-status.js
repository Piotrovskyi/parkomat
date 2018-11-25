const socket = require('./socket-connection');

module.exports = () => {
  console.log('set-parking-green-status 1');
  socket().emit('green');
};
