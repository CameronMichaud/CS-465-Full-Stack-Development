const fs = require('fs');
const news = JSON.parse(fs.readFileSync('./data/news.json', 'utf8'));
const testimonials = JSON.parse(fs.readFileSync('./data/testimonials.json', 'utf8'));
const sidebar = JSON.parse(fs.readFileSync('./data/sidebar.json', 'utf8'));

const main = (req, res) => {
    res.render('index', {title: 'Travlr Getaways', news, testimonials, sidebar, active: { home: true }});
};

module.exports = {
    main
}