const io = require('socket.io')(4001);
let sock;
io.on('connection', (socket) => {
  console.log('connection');
  sock = socket;
});
module.exports = () => sock;