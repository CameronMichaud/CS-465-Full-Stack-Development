const fs = require('fs');
const roomsJSON = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

const rooms = (req, res) => {
    res.render('rooms', {title: "Travlr Getaways - Rooms", roomsJSON, active: { rooms: true }});
};

module.exports = {
    rooms
}