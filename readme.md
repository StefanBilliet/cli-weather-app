# What is this? #
This is a practice cli app to show the current and perceived temperature for either a given address or the current location based on the IP address.

# How do I run it? #
This app uses the ECMAScript module system, which at the time of creation is still stuck behind a feature flag.

The app expects two env variables:
* FORECAST_API_KEY => forecast.io API key (https://darksky.net/dev)
* GOOGLE_API_KEY => Google Maps API key (https://developers.google.com/maps/)

Run

```
node --experimental-modules index.mjs --address '<address here>'
```

or

```
node --experimental-modules index.mjs
```

