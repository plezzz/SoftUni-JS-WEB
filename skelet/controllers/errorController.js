module.exports = {
    get: {
        displayError(req, res, next) {
            const url = req.url.replace('/','')
            res.render('error/not-found',{url})
        }
    }
};
