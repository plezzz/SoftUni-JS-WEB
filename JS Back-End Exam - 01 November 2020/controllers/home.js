const {Course} = require('../models');

module.exports = {
    get: {
        home(req, res, next) {
            if (req.user) {

                let search = {}
                if (req.query.search) {
                    let searchArgs = req.query.search
                    console.log(searchArgs)
                    search = {title: {$regex: new RegExp(searchArgs, "i")}}
                }

                Course
                    .find(search)
                    .sort({'createdAt': 'asc'})
                    .lean()
                    .then(courses => {
                        res.render('home/course', {courses})
                    })
                    .catch(next);
                return
            }

            Course
                .find({})
                .sort({usersEnrolled: 'desc'})
                .limit(3)
                .lean()
                .then(courses => {
                    console.log(courses)
                    res.render('home/home', {courses})
                })
                .catch(next);
        }
    }
};
