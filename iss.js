const request = require('request');

//  * Makes a single API request to retrieve the user's IP address.
//  * Input:
//  *   - A callback (to pass back an error or the IP string)
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The IP address as a string (null if error). Example: "162.245.144.188"


/////// body: {"ip":"24.72.139.57"}

const fetchMyIP = function(callback) {


  request('https://api.ipify.org?format=json', (error, response, body) => {


    if (error) {
      callback(`${error}`, null);
      return; // exit the function
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP:${body}`), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data.ip);

  });

};

module.exports = { fetchMyIP };