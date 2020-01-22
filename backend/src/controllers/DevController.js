const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringToArray = require('../utils/parseStringToArray');
const { findNearConnections, sendMessage } = require('../websocket'); 

module.exports = {
  async index(request, response) {
    const devs = await Dev.find(); //you can filter with objects as arguments

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {// if users didn't exists, apply the logic to create it 
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      const { name = login, avatar_url, bio } = apiResponse.data;
    
      const techsArray = parseStringToArray(techs);
    
      const location = {
        type:'Point',
        coordinates: [longitude, latitude],
      }
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      const sendSocketMessageTo = findNearConnections(
        { latitude, longitude  },
        techsArray
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    };
    return response.json(dev);
  },
  //criar update e destroy tb! visitar documentação do mongodb
}
