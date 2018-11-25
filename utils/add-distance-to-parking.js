const getDistance = (from, to) => {
  const R = 6378137;
  const dLat = rad(to.latitude - from.latitude);
  const dLong = rad(to.longitude - from.longitude);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(from.latitude)) * Math.cos(rad(to.latitude)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  console.log(123123123, a);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c / 1000);
};

const rad = (x) => {
  return x * Math.PI / 180;
};

module.exports = (userLocation, parking) => {
  const locationArray = userLocation.split(',');
  const location = {
    latitude: +locationArray[0],
    longitude: locationArray[1] ? +locationArray[1] : 0
  };

  const parkingLocation = {
    latitude: +parking.latitude,
    longitude: +parking.longitude,
  };

  parking.distance = getDistance(location, parkingLocation).toFixed(2);

  return parking;
};
