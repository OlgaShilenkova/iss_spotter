const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);




  fetchCoordsByIP("24.72.139.57", (error, coord) => {
    if (error) {
      console.log(`This did not work. Error:`, `${error}`);
      return;
    }

    console.log(`Everything ok!! latitude and longitude coordinates are: `, coord);



    fetchISSFlyOverTimes(coord, (error, message) => {
      if (error) {
        console.log(`This did not work. Error:`, `${error}`);
        return;
      }

      console.log(`Everything ok!! coordinates are: `, message);
    });


  });

});

const printWhenItPass = function(passTimes) {
  for (const pass of passTimes) {
    const dateAndTime = new Date(0);
    dateAndTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass of ISS happens at ${dateAndTime} for ${duration} seconds !`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out
  printWhenItPass(passTimes);
});






