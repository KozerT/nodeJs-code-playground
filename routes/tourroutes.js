const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

//Our route run, when only one of the Parameters are present, we have param function on route, that takes four params. This will work for the tours router only. ALl are required:
router.param('id', tourController.checkID);

//check body middleware function, body contains name and price property
// If not - 404 status should be sent;
// Add it to the post handler stack

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getOneTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
