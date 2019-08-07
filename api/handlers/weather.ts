import axios from 'axios';

const moment = require('moment');

import postcodeService from './postcode';
import LatLng from "../types/LatLng";
import WeatherData from "../types/weatherData";


class Weather {
  private metaWeatherUrl = 'https://www.metaweather.com/api/location/';

  private async getWoeId(params: LatLng): Promise<Number> {
      const url = this.metaWeatherUrl + 'search/?lattlong=' + params.lat + ',' + params.lng;
      const response = await axios.get(url);
  
      const closestLocation =
            response.data
              .sort(function(a: { distance: number; },
                             b: { distance: number; }) {
                      return a.distance > b.distance;
              })
              .shift();

      return closestLocation.woeid;           
  }

  private async getWeather(woeId : Number, date: Date): Promise<WeatherData> {
      const response = await axios.get(this.metaWeatherUrl + woeId);

      const data = response.data.consolidated_weather;
      
      const result = data.filter(
          function(el: WeatherData) {
            return (moment(el.applicable_date).format('YYYY-DD-MM') === moment(date).format('YYYY-DD-MM'));
      });
      return result.shift();
  }

 public async getWeatherByPostcode(postcode: string, date: Date): Promise<WeatherData> {
    const latLng = await postcodeService.getLngLat(postcode);

    if(latLng){
        const woeId  = await this.getWoeId(latLng)

        if(woeId){
	    return await this.getWeather(woeId, date);
        }
    }
  }
}


export default new Weather();