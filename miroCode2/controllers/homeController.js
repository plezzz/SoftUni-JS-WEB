module.exports = {
    get: {
        home(req, res, next) {
            res.render('./home/home',{age:4})
        },
    }
};
