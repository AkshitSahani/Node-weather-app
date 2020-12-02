const request = require("request");

const apiUrl = "http://api.weatherstack.com";
const accessKey = "36766294d2f2f64ce9c2b2b182a18656";

const forecast = (lat, lng, callback) => {
  const url = `${apiUrl}/current?access_key=${accessKey}&query=${lat},${lng}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current;
      const weather = `${weather_descriptions[0]}: The temp is ${temperature} degrees celcius and it feels like ${feelslike} degree celcius`;
      callback(undefined, weather);
    }
  });
};

module.exports = forecast;
