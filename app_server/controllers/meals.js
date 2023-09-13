const fs = require('fs');
const mealsJSON = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8'));

const meals = (req, res) => {
    res.render('meals', {title: "Travlr Getaways - Meals", mealsJSON, active: { meals: true }});
};

module.exports = {
    meals
}