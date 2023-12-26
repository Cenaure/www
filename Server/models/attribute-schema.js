const {Schema} = require('mongoose');

const AttributeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: String
})

module.exports = AttributeSchema;