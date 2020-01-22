const Dev = require('../models/Dev');
const parseStringToArray = require('../utils/parseStringToArray');

module.exports = {
  async index(request, response) {
    //Search devs in a range of 10km filtering by technology interest
    //const { techs } = response.query;
    const { latitude, longitude, techs } = request.query;
    const techsArray = parseStringToArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        }
      },
    });
    
    return response.json(devs);
  },
}