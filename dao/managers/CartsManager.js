const cartModel = require("../../dao/models/cartModel");


class CartsManager {


  async getById(id) {
    const carts = await cartModel.findById(id)
    return carts
  }

  async create(body) {
    const carts = await cartModel.create(body)
    return carts
  }

  
  async update(id, product) {
    const result = await cartModel.updateOne({_id: id}, product)
    return result
   }

  async getAll() {
    const cart = await cartModel.find().lean()
    return cart
  }


  async delete(id) {
    const result = await cartModel.deleteOne({_id: id})
    console.log(result)
    return result.deletedCount > 0;
  }

  async updateProductQuantity(cartId, productId, newQuantity) {
    try {
      const cart = await cartModel.findById(cartId);

      if (!cart) {
        return null;
      }

      const productIndex = cart.products.findIndex(item => item.product.toString() === productId);

      if (productIndex === -1) {
        return null; 
      }

      cart.products[productIndex].qty = newQuantity;
      await cart.save();

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    const result = await productModel.deleteMany()
    console.log(result)
  }

  async getPopulate(id) {
    try {
      const cart = await cartModel.findById(id).populate("products.product");
      return cart;
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      return null;
    }
  }
}


module.exports = new CartsManager ();