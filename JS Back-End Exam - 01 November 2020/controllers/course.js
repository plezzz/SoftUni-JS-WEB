const {Course, User} = require('../models');
const {errorCourse} = require('../config/messages');

let templateDir = (doc) => {
    return `course/${doc}`
};

module.exports = {
    get: {
        create(req, res) {
            res.render(templateDir('create'))
        },
        details(req, res, next) {
            let id = req.params.courseId;
            let userID = req.user._id.toString();
            let isCreator, isEnrolled = false;

            Course
                .findOne({_id: id})
                .lean()
                .then(course => {

                    course.usersEnrolled.forEach(enrolledUser => {
                        if (enrolledUser.toString() === userID) {
                            isEnrolled = true
                        }
                    })
                    course.createdBy.toString() === userID ? isCreator = true : isCreator = false;


                    res
                        .render(templateDir('details'), {course, isCreator, isEnrolled})
                })
                .catch(next)
        },
        edit(req, res, next) {
            let id = req.params.courseId;
            Course
                .findOne({_id: id})
                .lean()
                .then(course => {
                    res.render(templateDir('edit'), course)
                })
                .catch(next)
        },
        delete(req, res, next) {
            let id = req.params.courseId;
            Course
                .deleteOne({_id: id})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        },
        enroll(req, res, next) {
                let courseID = req.params.courseId;
                let userID = req.user._id;
                Promise.all([
                    User.updateOne({_id: userID}, {$push: {courses: courseID}}),
                    Course.updateOne({_id: courseID}, {$push: {usersEnrolled: userID}})
                ]).then(() => {
                    res.redirect(`/course/details/${courseID}`)
                })
                    .catch(next)
        }
    },

    post: {
        create: function (req, res, next) {
            const createdBy = req.user._id;
            let {title, description, imageURL, duration} = req.body;

            Course.create({title, description, imageURL, duration, createdBy})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        },
        edit(req, res, next) {
            let id = req.params.courseId;
            let {title, description, imageURL, duration} = req.body;

            Course
                .updateOne({_id: id}, {
                        title,
                        description,
                        imageURL,
                        duration
                    }, {runValidators: true}, function (err, result) {
                        if (err) {
                            console.log(err)
                            if (err.code === 11000) {
                                next(errorCourse.alreadyInUseObj);

                            }
                        }
                    }
                )
                .then(() => {
                    res.status(204);
                    res.redirect(`/course/details/${id}`)
                })
                .catch(next)
        },
    }
};


