const { nextISSTimesForMyLocation } = require('./iss_promised.js');

const printWhenItPass = function (passTimes) {
  for (const pass of passTimes) {
    const dateAndTime = new Date(0);
    dateAndTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass of ISS happens at ${dateAndTime} for ${duration} seconds !`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printWhenItPass(passTimes);
  })
  // .catch((error) => {
  //   console.log("it did not work", error.message);
  // });