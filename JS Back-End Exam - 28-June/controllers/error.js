module.exports = {
    get: {
        displayError(req, res) {
            const url = req.url;
            res.render('error/not-found', {url})
        }
    }
};
