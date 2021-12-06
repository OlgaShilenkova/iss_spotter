const request = require("request-promise-native");
/*
 * Requests data from api.open-notify.org using provided lat/long data
 * Input: JSON body containing geo data response from freegeoip.app
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const nextISSTimesForMyLocation = function () {
  // create propmise object and return it
  return fetchMyIP()//return IP
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)// return Latitude Longitude
    .then((body) => {
      const { response } = JSON.parse(body);
      return response;// only body.response
    });
};

/** 
 * Before we implement 
nextISSTimesForMyLocation 
there were 3 function one after enother called
 */

//1
const fetchMyIP = function (){
 return request('https://api.ipify.org?format=json');
};
// 2
const fetchCoordsByIP = function(body) {
 const ip = JSON.parse(body).ip;

 return request(`https://freegeoip.app/json/?apikey=${ip}`);
};

// 3
const fetchISSFlyOverTimes = function (body){
  const {latitude, longitude} = JSON.parse(body);

return  request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
};


// module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };


module.exports = {
  nextISSTimesForMyLocation
};
