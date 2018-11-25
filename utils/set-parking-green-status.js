const socket = require('./socket-connection');

module.exports = () => {
  console.log('set-parking-green-status 5');
  socket().emit('green');
};
