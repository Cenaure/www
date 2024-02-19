const {Schema, model} = require('mongoose');
const TypeAttributeSchema = require('./typeAttribute-schema');

const TypeSchema = new Schema({
    name: {type: String, unique: true, require: true},
    attributes: [TypeAttributeSchema],
    brands: [{type: Schema.Types.ObjectId, ref: 'Brand', require: false}] 
})
module.exports = model('Type', TypeSchema);