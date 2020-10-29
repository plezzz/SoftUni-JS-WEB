const {errorShoes} = require('../config/messages')()

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Number, Date} = Schema.Types

    const shoeSchema = new Schema({
        name: {
            type: String,
            required: [true, errorShoes.name]
        },
        price: {
            type: Number,
            min: [0, errorShoes.negativePrice],
            required: [true, errorShoes.price]
        },
        imageURL: {
            type: String,
            required: [true, errorShoes.imageURL]
        },
        description: {
            type: String,
            required: [true, errorShoes.description]
        },
        brand: {
            type: String,
            required: [true, errorShoes.brand]
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
        buyers: [{
            type: ObjectId,
            ref: "User"
        }]
    })

    return Model('Shoe', shoeSchema);
}
