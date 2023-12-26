const {Schema, model} = require('mongoose');
const AttributeSchema = require('./attribute-schema');

const TypeSchema = new Schema({
    name: {type: String, unique: true, require: true},
    attributes: [AttributeSchema]
})

module.exports = model('Type', TypeSchema);