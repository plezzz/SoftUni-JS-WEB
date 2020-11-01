const {errorExpense} = require('../config/messages')();

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Boolean, Number} = Schema.Types;

    const expenseSchema = new Schema({
        merchant: {
            type: String,
            required: [true, errorExpense.name],
            minLength: [4, errorExpense.minLengthMerch]
        },
        total: {
            type: Number,
            required: [true, errorExpense.total],
            min: [0, errorExpense.positive]
        },
        description: {
            type: String,
            minLength: [10, errorExpense.minLengthDesc],
            maxLength: [50, errorExpense.maxLengthDesc],
            required: [true, errorExpense.description]
        },
        category: {
            type: String,
            required: [true, errorExpense.category]
        },
        report: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: ObjectId,
            ref: "User",
            required: true
        }
    }, {timestamps: true});


    return Model('Expense', expenseSchema);
};
