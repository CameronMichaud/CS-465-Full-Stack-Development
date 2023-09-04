const contact = (req, res) => {
    res.render('contact', {title: "Travlr Getaways - Contact", active: { contact: true }});
};

module.exports = {
    contact
}