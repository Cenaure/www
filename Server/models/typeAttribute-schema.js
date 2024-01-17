const {Schema} = require('mongoose');

const TypeAttributeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  values: [{type: String}]
})

module.exports = TypeAttributeSchema;