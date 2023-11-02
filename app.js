const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

//1)MIDDLEWARES;
//use third party middleware - morgan:
app.use(morgan('dev'));
app.use(express.json());
//using a middleware, next third conventional argument needed:
//Important: the middleware order in Express meter, bc getAllTours will ends request response cycle!
app.use((req, res, next) => {
  console.log(`Hello from the middleware 🌞`);
  next(); // we need to call next function, otherwise, response/request cycle would be really sucked at this point
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); //info when exact request happened;
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//2) ROUTE HANDLERS

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requested: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getOneTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here..>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);

// 3) ROUTES
app
  .route('/api/v1/tours/:id')
  .get(getOneTour)
  .patch(updateTour)
  .delete(deleteTour);

// 3) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

////////**************************************************************** */

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

/////=============== 1 HANDLING GET REQUEST:file-based API;
//Before send the data , we have to read it:
//---_dirname - folder where is the current script is located;
//JSON.parse - the data after this, will be automatically converted into JS object;

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );

// //1.to send back to the client  all the tours
// app.get('/api/v1/tours', (req, res) => {
//   res.status(200).json({
//     // we have to specify what we gonna send back;
//     status: 'success',
//     results: tours.lengths, //This makes sense, when we are sending an array. :To see # of results that we are sanding;
//     data: {
//       tours: tours,
//     },
//   });
// });

// /////2.===============HANDLING POST REQUEST:file-based API;
// // POST request needed to add new tours to our dataset;
// app.post('/api/v1/tours', (req, res) => {
//   //*****!Important: with the POST request we can send some data to the server; This data available on the request. Out of the box, res. doesn't put that data on the request; In order to have this data available, middleware needed;*****//

//   //console.log(req.body); look up to the added dependencies;

//   //2.2 first thing that we have to figure out is to add  an id of the new object. BC we don't have any data base here yet;
//   const newId = tours[tours.lengths - 1].id + 1; //new id
//   //2.3  second - create a new tour
//   const newTour = Object.assign({ id: newId }, req.body); // this allows us to merge two objects together;
//   //2.4  push new tours to our object:
//   tours.push(newTour);
//   //2.5 now we have to persist the above created array to the file:
//   //*****!Important: since we are now in the event loop we don't want to break this loop, that's why we should not use writeFileAsync, or any other asynchronous function;*****//
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       //sending the response with the code, that the file is created;
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//   );
// });

// /////4.==============HANDLING PATCH REQUEST:file-based API;
// app.patch('api/v1/tours/:id', (req, res) => {
//   if (req.params.id * 1 > tours.lengths) {
//     //*1 -converting to a number;
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(200).json({
//     status: success,
//     data: {
//       tour: '<Updated tour here..>',
//     },
//   });
// });

// /////3.===============Responding to url parameters and getting only one tour, unique identifier:

// // ? - in the url,like this : '/api/v1/tours/:id/:x?' means that it's an optional parameter;

// app.get('/api/v1/tours/:id', (req, res) => {
//   console.log(req.params);
//   //3.1 Now we need to get an id from our JSON file, with all our arrays;
//   //3.2 we need convert our id strings to a numbers , operation above will do that foe us:
//   const id = req.params.id * 1;
//   const tour = tours.find((el) => el.id === id); // this create an element, where comparison is true; we can receive only one single tour;

//   //3.3 We need to check if the length not exit the lengths of our data;
//   //   if (id > tours.length) {  OR =>
//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour, //tours: tour,
//     },
//   });
// });

// /////4.===============DELETE request:
// app.delete('api/v1/tours/:id', (req, res) => {
//   if (req.params.id * 1 > tours.lengths) {
//     //*1 -converting to a number;
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(204).json({
//     status: success,
//     data: null,
//   });
// });

// //1.1 declare a server
// const port = 3000;
// //1.2 To start a server:
// app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });
