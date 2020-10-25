module.exports = {
    get: {
        home(req, res, next) {
            res.status(404)
            res.render('home/home', {age: 5})
        }
    }
};
