module.exports = parking => {
  parking = parking.toJSON();
  parking.actualCars = parking.sessions
    .filter(session => !session.closedAt)
    .map(session => session.car);
  delete parking.sessions;
  return parking;
};
