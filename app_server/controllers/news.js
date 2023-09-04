const news = (req, res) => {
    res.render('news', {title: "Travlr Getaways - News", active: { news: true }});
};

module.exports = {
    news
}