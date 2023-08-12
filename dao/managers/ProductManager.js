const productModel = require("../../dao/models/productModel")

class ProductManager {
 
  async getAll() {
    const products = await productModel.find().lean()
    return products
  }

  async getAllPaginate(page = 1, limit = 10) {
    const products= await productModel.paginate({}, {limit, page , lean: true})
    return products
  }

  async getById(id) {
    const products = await productModel.find({_id: id})
    return products[0]
  }

  async create(body) {
    const products = await productModel.create(body)
    return products
  }
  
  async update(id, product) {
   const result = await productModel.updateOne({_id: id}, product)
   return result
  }

  async delete(id) {
    const result = await productModel.deleteOne({_id: id})
    console.log(result)
    return result.deletedCount > 0;
  }

  async deleteAll() {
    const result = await productModel.deleteMany()
    console.log(result)
  }
  
}

module.exports = new  ProductManager()
