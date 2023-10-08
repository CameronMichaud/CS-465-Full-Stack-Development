const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router // Acessing all trips
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);
router // Updating/Getting a single trip
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;