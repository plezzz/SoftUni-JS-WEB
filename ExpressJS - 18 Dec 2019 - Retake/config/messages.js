const required = ' is require!'
module.exports = (data = null) => {
    return {
        db: 'Connected to database successfully!',
        app: `Server is ready, listening on port: ${data}...`,
        errorRegister: {
            email: 'Email' + required,
            password: 'Password' + required,
            repeatPassword: 'Repeat password' + required,
            dontMatch: 'Passwords don`t match!',
            alreadyInUse: 'The given email is already is use!',
            alreadyInUseObj: {
                _message: "User validation failed",
                errors: {error: {properties: {message: 'The given email is already is use!'}}}
            },
            minLengthEmail: 'The email should be in the following format (mailboxname @ domainname) -  "username@domain.bg"',
            minLengthPass: 'The password should be at least 6 characters long'
        },
        errorLogin: {
            password: 'The provided username or password does not matched.'
        },
        errorTrip: {
            imageURL: 'Should be actual link refering to the car image',
            positive: 'The Seats should be positive number',
            description: 'The description should be minimum 10 characters long',
            startEnd: 'The Starting Point - End Point - Starting and End point should be at least 4 characters long (each) and should be separated with single space, dash and another single space (" - ")',
            dateTime: '',
            seats: 'Seats'+ required
        }
    }
};
