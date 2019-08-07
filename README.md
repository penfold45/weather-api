# Weather API

NodeJS api that accepts a `postcode` and a `date` ie [http://localhost:3000/weather/SW152BU/2019-08-04](http://localhost:3000/weather/SW152BU/2019-08-04)

You will then get back a weather prodiction for the location on the given day.

The response will look like

```javascript
{
  "data": {
    "id": 4719877745016832,
    "weather_state_name": "Showers",
    "weather_state_abbr": "s",
    "wind_direction_compass": "SSE",
    "created": "2019-08-04T18:05:02.180991Z",
    "applicable_date": "2019-08-04",
    "min_temp": 16.005000000000003,
    "max_temp": 25.365000000000002,
    "the_temp": 25.435000000000002,
    "wind_speed": 6.409756109120072,
    "wind_direction": 164.49151255403197,
    "air_pressure": 1012.8299999999999,
    "humidity": 58,
    "visibility": 9.397617911397438,
    "predictability": 73
  }
}
```

## To start the project

After checking out the code

`npm run start`

To check everything is working as expected please run

`npm test`


## @todo

* Save requests to a DB/ElasticSearch to servere as caching / reporting service. 
* Create Docker instance
* Add unit tests to the funcitonal tests
* Could do with better error handling.