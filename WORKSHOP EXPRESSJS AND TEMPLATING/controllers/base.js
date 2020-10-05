module.exports = {
     getAbout(req, res) {
        return res.render('about')
    },
    get404(req, res) {
        return res.render('404')
    }
};
