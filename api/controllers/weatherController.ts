import weather from '../handlers/weather';
const { param, validationResult } = require('express-validator');

exports.get = async function(req, res, next) {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    try{
      const weatherData = await weather.getWeatherByPostcode(req.params.postcode, new Date(req.params.date))
      res.json({ data: weatherData });
    } catch(error){
      next(error);
    }
}

exports.validate = (method) => {
    switch (method) {
      case 'get': {
       return [ 
            param('postcode', 'postcode must match ^[A-Za-z0-9]{4,9}$')
                .exists()
                .matches(/^[A-Za-z0-9]{4,9}$/),
            param('date', 'date must be YYYY-MM-DD')
                .exists()
                .matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
         ]   
      }
    }
  }