const {Schema, model} = require('mongoose');

const BrandSchema = new Schema({
    name: {type: String, unique: true, require: true},
})

module.exports = model('Brand', BrandSchema);