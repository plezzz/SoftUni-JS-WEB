const {errorCourse} = require('../config/messages')();

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId} = Schema.Types;

    const courseSchema = new Schema({
        title: {
            type: String,
            minlength: [4,errorCourse.minTitle],
            unique: [true, errorCourse.alreadyInUse],
            required: [true, errorCourse.name]
        },
        description: {
            type: String,
            minlength: [20, errorCourse.minDesc],
            maxlength: [50, errorCourse.maxDesc],
            required: [true, errorCourse.description]
        },
        imageURL: {
            type: String,
            required: [true, errorCourse.imageURL],
            match: [/^((http|https):\/\/){1,1}(w{3,3}\.)?/, errorCourse.imageURLHTTP],
        },
        duration: {
            type: String,
            required: [true, errorCourse.duration],
        },
        createdBy: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        usersEnrolled: [{
            type: ObjectId,
            ref: "User"
        }]
    }, {timestamps: true});

    courseSchema.post('save', function (error, doc, next) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(errorCourse.alreadyInUseObj);
        } else {
            next(error);
        }
    });

    return Model('Course', courseSchema);
};
