import fetch from 'node-fetch';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

function getLocationBasedOnIpAddress() {
  return fetch('https://ipinfo.io', {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Status: ${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .then(({ city, region, country, loc }) => {
      const [longitude, latitude] = loc.split(',');

      return [{
        formatted_address: `Approximately somewhere in ${city}, ${region} - ${country}`,
        longitude,
        latitude
      }];
    });
}

function getLocationBasedOnAddress(requestedAddress) {
  const encodedRequestedAddress = encodeURIComponent(requestedAddress);

  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedRequestedAddress}&key=${GOOGLE_API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Status: ${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .then(json => {
      if (json.status === 'ZERO_RESULTS' || json.results.length === 0) {
        throw new Error('Unable to retrieve that address.');
        return;
      }

      if (json.status !== 'OK') {
        throw new Error(`Status: ${json.status}`);
      }

      return json.results.map(result => {
        const { geometry: { location: { lng: longitude, lat: latitude } }, formatted_address } = result;

        return {
          formatted_address,
          longitude,
          latitude
        };
      });
    })
}

const geocodeAddress = (requestedAddress) => {
  if (!requestedAddress) {
    return getLocationBasedOnIpAddress();
  }

  return getLocationBasedOnAddress(requestedAddress);
};

export { geocodeAddress };