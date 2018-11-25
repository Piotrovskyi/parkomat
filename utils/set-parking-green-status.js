const socket = require('./socket-connection');

module.exports = () => {
  console.log('set-parking-green-status 4');
  socket().emit('green');
};
