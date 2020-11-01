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
            amount: 'The account amount  should be positive number!',
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
        errorExpense: {
            minLengthMerch: 'The merchant should be at least 4 characters long',
            minLengthDesc: 'The description should be minimum 10 characters long ',
            maxLengthDesc: 'The description should be maximum 50 characters long ',
            name: 'Name' + required,
            price: 'Price' + required,
            total: 'Total' + required,
            description: 'Description' + required,
            category: 'Category' + required,
            negativePrice: 'Price can`t be negative number',
            positive: 'The total should be positive number',
        },
        refillError: {
            amountErr: {
                _message: "Refill validation failed",
                errors: {error: {properties: {message: 'Amount must be number'}}}
            },
        }
    }
};
