const fs = require('fs');
const latest_news = JSON.parse(fs.readFileSync('./data/latest_news.json', 'utf8'));
const vacation_tips = JSON.parse(fs.readFileSync('./data/vacation_tips.json', 'utf8'));

const news = (req, res) => {
    res.render('news', {title: "Travlr Getaways - News", latest_news, vacation_tips, active: { news: true }});
};

module.exports = {
    news
}