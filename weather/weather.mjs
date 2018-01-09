import fetch from 'node-fetch';

const FORECAST_API_KEY = process.env.FORECAST_IO_API_KEY;

const getCurrentTemperature = (longitude, latitude, callback) => {
  return fetch(`https://api.darksky.net/forecast/${FORECAST_API_KEY}/${longitude},${latitude}?units=ca`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Status: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  })
  .then(json => {
    return {
      temperature: json.currently.temperature,
      apparentTemperature: json.currently.apparentTemperature
    };     
  });
};

export { getCurrentTemperature };