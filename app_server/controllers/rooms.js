const rooms = (req, res) => {
    res.render('rooms', {title: "Travlr Getaways - Rooms", active: { rooms: true }});
};

module.exports = {
    rooms
}