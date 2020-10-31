const {errorTrip} = require('../config/messages')();

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Number} = Schema.Types;

    const tripSchema = new Schema({
        startPoint: {
            type: String,
            required: [true, errorTrip.startEnd]
        },
        endPoint: {
            type: String,
            required: [true, errorTrip.startEnd]
        },
        date: {
            type: String,
            required: [true, errorTrip.dateTime]
        },
        time: {
            type: String,
            required: [true, errorTrip.dateTime]
        },
        seats: {
            type: Number,
            min: [0, errorTrip.positive],
            required: [true, errorTrip.seats]
        },
        description: {
            type: String,
            minLength: [10, errorTrip.description],
            required: [true, errorTrip.description]
        },
        carImage: {
            type: String,
            required: [true, errorTrip.imageURL],
            match: [/^((http|https):\/\/){1,1}(w{3,3}\.)?/, errorTrip.imageURL],
            index: true
        },
        createdBy: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        buddies: [{
            type: ObjectId,
            ref: "User"
        }]
    }, {timestamps: true});

    tripSchema.virtual('startEnd')
        .get(function () {
            return this._startEnd;
        })
        .set(function (value) {
            this._startEnd = value;
        });

    tripSchema.pre('validate', function (next) {
        if (!this.startEnd || this.startEnd.length <= 4 || !this.startEnd.includes(" - ")) {
            this.invalidate('startEnd', errorTrip.startEnd)
        }
        next();
    });

    tripSchema.virtual('dateTime')
        .get(function () {
            return this._dateTime;
        })
        .set(function (value) {
            this._dateTime = value;
        });

    tripSchema.pre('validate', function (next) {
        if (!this.dateTime || this.dateTime.length <= 6 || !this.dateTime.includes(" - ")) {
            this.invalidate('startEnd', errorTrip.dateTime)
        }
        next();
    });

    return Model('Trip', tripSchema);
};
