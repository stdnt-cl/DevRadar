function degreesToRadians(degree) {
  return (degree * (Math.PI / 180));
}

module.exports = function getDistanceInKMPassingLatitudeAndLongitude(centerCoordinates, pointCoordinates) {
  const radius = 6371;

  const { latitude: centerLatitude, longitude: centerLongitude} = centerCoordinates;
  const { latitude: pointLatitude, longitude: pointLongitude} = pointCoordinates;

  const latitudesDifference = degreesToRadians(pointLatitude - centerLatitude);
  const longitudesDifference = degreesToRadians(pointLongitude - centerLongitude);

  const a =
    Math.sin(latitudesDifference / 2) * Math.sin(latitudesDifference / 2) +
    Math.cos(degreesToRadians(centerLatitude)) * Math.cos(degreesToRadians(pointLatitude)) *
    Math.sin(longitudesDifference / 2) * Math.sin(longitudesDifference / 2)
  ;
  
  const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = radius * center;

  return distance;
}
