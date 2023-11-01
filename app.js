const express = require('express');
const fs = require('fs');
const app = express();

// //3.Define route. Route means- how our app response to a certain url, HTTP method, that's been used to that request
// //changing send to json, bc send just send to the client
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Hello from the sever side',
//     app: 'Natours',
//   });
// });
// //4.Post method: - to post to this url/endpoint
// app.post('/', (req, res) => {
//   res.send('You can post to this url, endpoint');
// });

// //1.declare a server
// const port = 3000;
// //2.To start a server:
// app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

/////===============HANDLING GET REQUEST:file-based API;
//2.Before send the data , we have to read it:
//---_dirname - folder where is the current script is located;
//JSON.parse - the data after this, will be automatically converted into JS object;

const tours = JSON.parse(
  fs.readFileSync(`${_dirname}/dev-data/data/tours-simple.json`)
);

//1.to send back to the client  all the tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    // we have to specify what we gonna send back;
    status: 'success',
    results: tours.lengths, //This makes sense, when we are sending an array. :To see # of results that we are sanding;
    data: {
      tours: tours,
    },
  });
});

//1.declare a server
const port = 3000;
//2.To start a server:
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
