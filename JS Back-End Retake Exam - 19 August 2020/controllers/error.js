module.exports = {
    get: {
        displayError(req, res) {
            const url = req.url.replace('/','')
            res.render('error/not-found',{url})
        }
    }
};
