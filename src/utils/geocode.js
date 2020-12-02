const request = require("request");

const GEOTOKEN =
  "pk.eyJ1IjoiYWtzaGl0c2FoYW5pIiwiYSI6ImNrYTRzeTBxaDA2cmozZm9lc211M3hzMzQifQ.Pr3VstZsoq-SQmIYxnKIUQ";

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${GEOTOKEN}&limit=1`;

  request({ url, json: true }, (error, { body: { features } }) => {
    if (error) {
      callback("unable to connect to location services!", undefined);
    } else if (features.length === 0) {
      callback("unable to find location. Try another search", undefined);
    } else {
      const [longitude, latitude] = features[0].center;
      const location = features[0].place_name;
      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geocode;
