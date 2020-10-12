const mongoose = require('mongoose');

module.exports = (mongoDB) => {
    return mongoose.connect(
        mongoDB,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((data)=>{
        console.log('Connected to database successfully!');
        return data
    });
};
