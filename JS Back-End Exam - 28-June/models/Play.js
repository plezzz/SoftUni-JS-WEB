const {errorPlay} = require('../config/messages')();

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Boolean} = Schema.Types;

    const playSchema = new Schema({
        title: {
            type: String,
            required: [true, errorPlay.name]
        },
        imageURL: {
            type: String,
            required: [true, errorPlay.imageURL]
        },
        description: {
            type: String,
            required: [true, errorPlay.description]
        },
        isPublic: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        likes: {
            type: Number,
            default: 0
        },
        usersLiked: [{
            type: ObjectId,
            ref: "User"
        }]
    }, {timestamps: true});


    return Model('Play', playSchema);
};
