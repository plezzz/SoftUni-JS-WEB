const {saltRounds} = require('../config')
const {errorRegister} = require('../config/messages')()

module.exports = (mongoose, bcrypt) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId} = Schema.Types

    const userSchema = new Schema({
        email: {
            type: String,
            minlength: [3, errorRegister.minLengthEmail],
            required: [true, errorRegister.email],
            unique: [true, errorRegister.alreadyInUse]
        },
        fullName: {
            type: String,
            required: [true, errorRegister.fullName]
        },
        password: {
            type: String,
            minlength: [3, errorRegister.minLengthPass],
            required: [true, errorRegister.password]
        },
        myOffers: {
            type: Number,
            required: true
        },
        offersBought: [
            {
                type: ObjectId,
                ref: "Shoe"
            }
        ]
    });


    userSchema.virtual('repeatPassword')
        .get(function () {
            return this._repeatPassword;
        })
        .set(function (value) {
            this._repeatPassword = value;
        });

    userSchema.pre('validate', function (next) {
        if (!this.repeatPassword) {
            this.invalidate('repeatPassword', errorRegister.repeatPassword)
        }
        if (this.password !== this.repeatPassword) {
            this.invalidate('repeatPassword', errorRegister.dontMatch);
        }
        next();
    });

    userSchema.methods = {
        comparePasswords(password) {
            return bcrypt.compare(password, this.password);
        }
    };

    userSchema.post('save', function (error, doc, next) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(errorRegister.alreadyInUseObj);
        } else {
            next(error);
        }
    });

    userSchema.pre('save', function (next) {

        if (!this.isModified('password')) {
            next();
            return;
        }

        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
                return;
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                    return;
                }
                this.password = hash;
                next();
            })
        })
    })

    return Model('User', userSchema);
};
