const Cart = require('../models/cart-model');
const Product = require('../models/device-model');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Товар не знайдено' });
    }

    const cart = await Cart.findOne({_id: userId});

    if (!cart) {
      const newCart = new Cart({
        userId: {_id: userId},
        items: [{ product, quantity }],
      });
      await newCart.save();
      return res.status(201).json(newCart);
    }

    const existingItem = cart.items.find(item => item.product.equals(productId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.product');

    if (!cart) {
      return res.status(404).json({ message: 'Корзина не найдена' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
