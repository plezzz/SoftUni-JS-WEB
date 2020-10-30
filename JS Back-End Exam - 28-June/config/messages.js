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
            minLengthUsername: 'The username should be at least 3 characters long!',
            minLengthPass: 'The password should be at least 3 characters long!'
        },
        errorLogin: {
            password: 'The provided username or password does not matched.'
        },
        errorShoes: {
            name: 'Name' + required,
            price: 'Price' + required,
            imageURL: 'Image URL' + required,
            description: 'Description' + required,
            brand: 'Brand' + required,
            negativePrice: 'Price can`t be negative number'
        }
    }
};
