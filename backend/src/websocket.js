const socketio = require('socket.io');
const parseStringToArray = require('./utils/parseStringToArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = []; // not recommended use variables to it, better a db such as redis

exports.setupWebsocket = (server) => {
   io = socketio(server);

   io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;
    
    connections.push({
      id: socket.id,
      coords: {
        latitude,
        longitude
      },
      techs: parseStringToArray(techs)
    });
   });
};

exports.findNearConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return calculateDistance(coordinates, conection.coordinates) < 10
      && connection.techs.some(item => techs.include(item));
  })
};

exports.sendMessage = (to, messageEventName, messageCallback) => {
  to.forEach(connection => {
    io.to(connection.id).emit(messageEventName, messageCallback);
  })
}
 