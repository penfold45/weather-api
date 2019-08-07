module.exports = function(app) {
  const weatherController = require('../controllers/weatherController');

  // weatherController Routes
  app.route('/weather/:postcode/:date')
    .get(weatherController.validate('get'), 
         weatherController.get);
};
