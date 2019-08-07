import { expect } from 'chai';
import axios from 'axios';

const moment = require('moment');
const endpoint = 'http://localhost:3000/weather/';

describe("get Weather data information", function () {
    var postcodes = ['SW152BU', 'DN396UQ', 'SE100AA', 'TS274HR'];
    postcodes.forEach(function (postcode: string) {
        getDates().forEach(function (date: string) {
            it("get Weather data for " + postcode + " on " + date, async function () {
                const url = endpoint + postcode + '/' + date;
                const response = await axios.get(url)

                expect(response).to.have.keys(['status',
                    'statusText',
                    'headers',
                    'config',
                    'request',
                    'data']);

                expect(response.data).to.have.key('data');
                expect(response.data.data).to.be.a('object');

                const data = response.data.data;

                expect(Object.keys(data)).to.have.lengthOf(15);
                expect(data).to.have.keys([
                    'id',
                    'weather_state_name',
                    'weather_state_abbr',
                    'wind_direction_compass',
                    'created',
                    'applicable_date',
                    'min_temp',
                    'max_temp',
                    'the_temp',
                    'wind_speed',
                    'wind_direction',
                    'air_pressure',
                    'humidity',
                    'visibility',
                    'predictability']);
            });
        });
    });

    var postcodes = ['----', 'SW1234567899', 's', 'sw 3425'];
    postcodes.forEach(function (postcode: string) {
        getDates().forEach(function (date: string) {
            it("validate incorrect postcode on api for " + postcode + " on " + date, async function () {
                var hadError = false;
                const url = endpoint + postcode + '/' + date;
                const response = await axios.get(url)
                .catch(function(e){
                    hadError = true;
                    expect(e.response.status).to.equal(422);
                })

                if(hadError === false){
                    expect(true, 'We sould never have got a valid response for ' + postcode).to.be.equal(false);
                }
            });
        });

        var postcodes = ['SW152BU', 'DN396UQ', 'SE100AA', 'TS274HR'];
        postcodes.forEach(function (postcode: string) {
            const today = new Date();
            var todayString = moment(today).format('YY MM DD');
            [todayString, '22-22-2930'].forEach(function (date: string) {
                it("validate incorrect dates on api for " + postcode + " on " + date, async function () {
                    var hadError = false;
                    const url = endpoint + postcode + '/' + date;
                    const response = await axios.get(url)
                        .catch(function (e) {
                            hadError = true;
                            expect(e.response.status).to.equal(422);
                        })

                    if (hadError === false) {
                        expect(true, 'We sould never have got a valid response for ' + postcode).to.be.equal(false);
                    }
                });
            });
        });

        var postcodes = ['SW152347'];
        postcodes.forEach(function (postcode: string) {
            getDates().forEach(function (date: string) {
                it("check valid data that will fail " + postcode + " on " + date, async function () {
                    var hadError = false;
                    const url = endpoint + postcode + '/' + date;
                    const response = await axios.get(url)
                        .catch(function (e) {
                            hadError = true;
                            expect(e.response.status).to.equal(404);
                        })

                    if (hadError === false) {
                        expect(true, 'We sould never have got a valid response for ' + postcode).to.be.equal(false);
                    }
                });
            });
        });
    });
});

function getDates() {
    const today = new Date();
    var todayString = moment(today).format('YYYY-MM-DD');

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var tomorrowString = moment(tomorrow).format('YYYY-MM-DD');

    return [todayString, tomorrowString];
}