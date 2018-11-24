const moment = require('moment');

module.exports = (start, end) => {
  const duration = moment.duration(moment(end).diff(start));
  return Math.floor(duration.asMinutes() * 1000);
}