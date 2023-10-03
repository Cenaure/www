const {Schema, model} = require('mongoose');

const TypeSchema = new Schema({
    name: {type: String, unique: true, require: true},
})

module.exports = model('Type', TypeSchema);