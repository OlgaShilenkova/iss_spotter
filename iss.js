const request = require('request');

//  * Makes a single API request to retrieve the user's IP address.
//  * Input:
//  *   - A callback (to pass back an error or the IP string)
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The IP address as a string (null if error). Example: "162.245.144.188"


/////// body: {"ip":"24.72.139.57"}

/****** nextISSTimesForMyLocation
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, place) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(place, (error, when) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, when);
      });
    });
  });
};



// # 1
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      return callback(`${error}`, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP:${body}`), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data.ip);
  });
};


// # 2
const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/?apikey=${ip}`
    , (error, response, body) => {
      if (error) {
        return callback(`${error}`, null);
      }
      if (response.statusCode !== 200) {
        callback(Error(`Status code ${response.statusCode} when fetching coordinates :${body}`), null);
        return;
      }
      const data = JSON.parse(body);
      let latLng = {
        "latitude": data.latitude,
        "longitude": data.longitude
      };
      callback(null, latLng);
    });
};

// # 3
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`
    , (error, response, body) => {
      if (error) {
        return callback(`${error}`, null);
      }
      if (response.statusCode !== 200) {
        callback(Error(`Status code ${response.statusCode} when fetching coordinates :${body}`), null);
        return;
      }
      const when = JSON.parse(body);
      callback(null, when.response);
    });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
