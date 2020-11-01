const required = ' is require!'
module.exports = (data = null) => {
    return {
        db: 'Connected to database successfully!',
        app: `Server is ready, listening on port: ${data}...`,
        errorRegister: {
            username: 'Username' + required,
            password: 'Password' + required,
            repeatPassword: 'Repeat password' + required,
            dontMatch: 'The repeat password should be equal to the password',
            alreadyInUse: 'The given username is already is use!',
            alreadyInUseObj: {
                _message: "User validation failed",
                errors: {error: {properties: {message: 'The given username is already is use!'}}}
            },
            minLengthUsername: 'The username should be at least 5 characters long',
            minLengthPass: 'The password should be at least 5 characters long',
            containsCharUsername: 'The username should consist only english letters and digits!',
            containsCharPassword: 'The password should consist only english letters and digits!',
        },
        errorLogin: {
            password: 'The provided username or password does not matched'
        },
        errorCourse: {
            alreadyInUse: 'The given title is already is use!',
            name: 'Name' + required,
            minTitle: 'The title should be at least 4 characters',
            imageURL: 'Image URL' + required,
            imageURLHTTP: 'The imageURL should starts with http or https',
            description: 'Description' + required,
            maxDesc: 'The description must be no longer than 50 characters',
            minDesc: 'The description should be at least 20 characters long',
            duration: 'Duration' + required,
            alreadyInUseObj: {
                _message: "Course validation failed",
                errors: {error: {properties: {message: 'The given title is already is use!'}}}
            },
        }
    }
};
