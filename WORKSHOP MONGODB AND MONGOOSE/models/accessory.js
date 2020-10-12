const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: String,
    description: String,
    imageURL: String,
    cubes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cube' }]

});

module.exports = new mongoose.model('accessory', accessorySchema);
