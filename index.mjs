import yargs from 'yargs';
import { geocodeAddress } from './geocode/geocode';
import { getCurrentTemperature } from './weather/weather';

const argv = yargs
  .options({
    address: {
      demand: false,
      alias: 'a',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const { address } = argv;

geocodeAddress(address)
.then(([{formatted_address, longitude, latitude}]) => {
  debugger;
  console.log(`Address: ${formatted_address}`);
  return getCurrentTemperature(longitude, latitude);
})
.then(({temperature, apparentTemperature}) => {  
  console.log(`Current temperature is ${temperature} degrees Celsius; it feels like ${apparentTemperature} degrees Celsius.`);
})
.catch(error => console.log(error));