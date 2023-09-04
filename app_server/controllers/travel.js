const travel = (req, res) => {
    res.render('travel', {title: "Travlr Getaways - Travel", active: { travel: true }});
};

module.exports = {
    travel
}