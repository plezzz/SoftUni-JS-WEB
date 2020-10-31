const required = ' is require!'
module.exports = (data = null) => {
    return {
        db: 'Connected to database successfully!',
        app: `Server is ready, listening on port: ${data}...`,
        errorRegister: {
            username: 'Username' + required,
            password: 'Password' + required,
            repeatPassword: 'Repeat password' + required,
            dontMatch: 'Password don`t match!',
            alreadyInUse: 'The given username is already is use!',
            alreadyInUseObj: {
                _message: "User validation failed",
                errors: {error: {properties: {message: 'The given username is already is use!'}}}
            },
            minLengthUsername: 'The username should be at least 3 characters long and should consist only english letters and digits!',
            minLengthPass: 'The password should be at least 3 characters long and should consist only english letters and digits'
        },
        errorLogin: {
            password: 'The repeat password should be equal to the password'
        },
        errorPlay: {
            name: 'Name' + required,
            price: 'Price' + required,
            imageURL: 'Image URL' + required,
            description: 'Description' + required,
            brand: 'Brand' + required,
            negativePrice: 'Price can`t be negative number'
        }
    }
};
