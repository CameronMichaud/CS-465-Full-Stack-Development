const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const User = mongoose.model('users');

const getUser = (req, res, callback) => {
    console.log("Get User callback");
    if (req.payload && req.payload.email) {
        console.log("Get User callback, payload: " + req.payload.email);
        User
            .findOne({ email: req.payload.email })
            .exec((err, user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ "message": "User not found" });
                } else if (err) {
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);
                }
                callback(req, res, user.name);
            });
    } else {
        console.log("Get User callback, payload: " + req.payload);
        return res
            .status(404)
            .json({ "message": "User not found" });

    }
};

const tripsList = async (req, res) => {
    Trip
        .find({}) // Empty filter for all
        .exec((err, Trips) => {
            if (!Trips) {
                return res
                    .status(404)
                    .json({ "message": "Trip not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(Trips);
            }
        });
};

// GET: /Trips/TripCode - return a single Trip
const tripsFindCode = async (req, res) => {
    Trip
        .find({ 'code': req.params.TripCode })
        .exec((err, Trip) => {
            if (!Trip) {
                return res
                    .status(404)
                    .json({ "message": "Trip not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(Trip);
            }
        });
};

// POST: add Trip
const tripsAddTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
    Trip
    .create({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    },
    (err, Trip) => {
        if (err) {
            return res
                .status(400)
                .json(err);
        } else {
            return res
                .status(201) // Created
                .json(Trip);
        }
    });
  })
}

// PUT: update Trip
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
    Trip
        .findOneAndUpdate({ 'code': req.params.TripCode}, {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }, { new: true})
            .then(Trip => {
                if (!Trip) {
                    return res
                        .status(404)
                        .send({
                            message: "Trip not found with code " + req.params.TripCode
                        });
                    }
                    res.send(Trip);
            }).catch(err => {
                if (err.kind === "ObjectId") {
                    return res
                        .status(404)
                        .send({
                            message: "Trip not found with code " + req.params.TripCode
                        })
                }
                return res
                    .status(500) // Server error
                    .json(err);
            });
        })
}

// DELETE: delete Trip
const tripsDeleteTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
    Trip
        .deleteOne({ 'code': req.params.TripCode }, (err, result) => {
            if (err) {
                return res.status(500).json(err); // Server Error
            }

            if (result.deletedCount === 0) {
                return res.status(404).send( {message: "Trip not found" });
            }

            return res.status(204).send(); // Deletion succeeded, no content
        });
    })
}

module.exports = { // Export functions for routes/index.js
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};