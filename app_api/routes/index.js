const express = require('express');
const router = express.Router();
const { expressjwt: jwt }  = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    algorithms: ["HS256"],
});

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');


router // User Auth
    .route('/login')
    .post(authController.login)
router // User Registration
    .route('/register')
    .post(authController.register);
router // Acessing all trips
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);
router // Updating/Getting a single trip
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(auth, tripsController.tripsUpdateTrip)
    .delete(auth, tripsController.tripsDeleteTrip);

module.exports = router;