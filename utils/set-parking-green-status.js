const socket = require('./socket-connection');

module.exports = () => {
  console.log('set-parking-green-status');
  socket().emit('green');
};
