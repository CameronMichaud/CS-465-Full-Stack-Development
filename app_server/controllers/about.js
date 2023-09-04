const about = (req, res) => {
    res.render('about', {title: "Travlr Getaways - About", active: { about: true }});
};

module.exports = {
    about
}