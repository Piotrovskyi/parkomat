const socket = require('./socket-connection');

module.exports = () => {
  console.log('set-parking-green-status 2');
  socket().emit('green');
};
