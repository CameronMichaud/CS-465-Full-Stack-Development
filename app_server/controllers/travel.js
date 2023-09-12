const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Get traveler view
const travel = (req, res) => {
    res.render('travel', {title: "Travlr Getaways - Travel", trips, active: { travel: true }});
};

module.exports = {
    travel
}