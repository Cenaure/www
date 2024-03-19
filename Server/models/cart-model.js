const {Schema, model} = require('mongoose');

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1, 
      },
    },
  ],
});

module.exports = model('Cart', cartSchema);
