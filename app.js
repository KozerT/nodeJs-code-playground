// const express = require('express');
// const fs = require('fs');
// const app = express();

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
/////==================TO get all the tours
//2.Before send the data , we have to read it:
const tours = JSON.parse(
  fs.readFileSync(`${_dirname}/dev-data/data/tours-simple.json`)
);

//1.to send back to the client  all the tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.lengths,
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
