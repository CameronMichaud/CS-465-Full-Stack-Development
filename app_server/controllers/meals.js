const meals = (req, res) => {
    res.render('meals', {title: "Travlr Getaways - Meals", active: { meals: true }});
};

module.exports = {
    meals
}