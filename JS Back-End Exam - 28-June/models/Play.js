const {errorShoes} = require('../config/messages')();

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Boolean, Date} = Schema.Types;

    const playSchema = new Schema({
        title: {
            type: String,
            required: [true, errorShoes.name]
        },
        imageURL: {
            type: String,
            required: [true, errorShoes.imageURL]
        },
        description: {
            type: String,
            required: [true, errorShoes.description]
        },
        isPublic:{
            type:Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            required: true
        },
        createdBy: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        usersLiked: [{
            type: ObjectId,
            ref: "User"
        }]
    });

    return Model('Play', playSchema);
};
