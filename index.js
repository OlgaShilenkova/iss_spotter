const { fetchMyIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);
});


// My test and call of function
// fetchMyIP((error, message) => {
//   if (error) {
//     console.log(`Error:`, error);
//     return;
//   }

//   console.log(`Everything ok:`, message);


// });



