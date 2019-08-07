import axios from 'axios';
import LatLng from "../types/LatLng";

class Postcode {
  private postcodeUrl = 'https://api.postcodes.io/postcodes/';

  public async getLngLat(postcode: string): Promise<LatLng> {
      const response = await axios.get(this.postcodeUrl + postcode);

      return { lng: response.data.result.longitude,
               lat: response.data.result.latitude };
  }
}

export default new Postcode();