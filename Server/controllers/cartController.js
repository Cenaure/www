const ApiError = require('../error/api-error');
const Cart = require('../models/cart-model');
const Product = require('../models/device-model');

class CartController {
  async addToCart(req, res) {
    try {
      const { productId, quantity, userId } = req.body;
      
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Товар не знайдено' });
      }
  
      const cart = await Cart.findOne({userId: userId});
  
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

  async getCart(req, res) {
    try {
      const userId = req.params;
  
      const cart = await Cart.findOne({ userId: userId.userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Корзина не найдена' });
      }
  
      res.status(200).json(cart);
    } catch (error) { 
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };

  async deleteItem(req, res, next) {
    try {
      const {userId, itemId} = req.params;
      const cart = await Cart.findOne({ userId: userId });
      
      if (!cart) {
        return res.status(404).json({ message: 'Корзина не найдена' });
      }
      const itemIndex = cart.items.findIndex(item => item.product.toString() === itemId);
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Елемент не знайдено' });
      }
      
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return res.status(200).json({ message: 'Елемент видалений' });
    } catch (error) {
      next(ApiError.internal(error.message))
    }
  }

  async decreaseQuantity(req, res, next) {
    try {
      const {userId, itemId} = req.params;
      const cart = await Cart.findOne({ userId: userId });
      
      if (!cart) {
        return res.status(404).json({ message: 'Корзина не найдена' });
      }
      const itemIndex = cart.items.findIndex(item => item.product.toString() === itemId);
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Елемент не знайдено' });
      }
      
      cart.items[itemIndex].quantity -= 1;
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
      
      await cart.save();
      return res.status(200).json({ message: 'Количество товара уменьшено' });
    } catch (error) {
      next(ApiError.internal(error.message))
    }
  }  

  async increaseQuantity(req, res, next) {
    try {
      const {userId, itemId} = req.params;
      const cart = await Cart.findOne({ userId: userId });

      if (!cart) {
        return res.status(404).json({ message: 'Корзина не найдена' });
      }
      const itemIndex = cart.items.findIndex(item => item.product.toString() === itemId);
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Елемент не знайдено' });
      }
      
      cart.items[itemIndex].quantity += 1;
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
      
      await cart.save();
      return res.status(200).json({ message: 'Количество товара уменьшено' });
    } catch (error) {
      next(ApiError.internal(error.message))
    }
  }  
}

module.exports = new CartController();