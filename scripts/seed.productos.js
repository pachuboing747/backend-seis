const faker = require("faker");
const productModel = require("../dao/models/productModel.js");
const mongoose = require('mongoose');

// function generateProducts(count) {
//   const products = [];

//   for (let i = 0; i < count; i++) {
//     const title = faker.commerce.productName();
//     const description = faker.commerce.productDescription();
//     const price = faker.commerce.price(); 
//     const thumbnail = faker.image.imageUrl();
//     const code = faker.datatype.uuid();
//     const stock = faker.datatype.number();

//     products.push({ title, description, price, thumbnail, code, stock });
//   }

//   return products;
// }

// const numberOfProducts = 100;
// const productsRecords = generateProducts(numberOfProducts);

// console.log(productsRecords);


async function main() {
  await mongoose.connect("mongodb+srv://pachu1982721:VPXombCDAVDvOaVQ@cluster0.lvefot0.mongodb.net/ecommerce?retryWrites=true&w=majority")
  // const result = await productModel.insertMany(productsRecords)
const result = await productModel.find({stock: 13}).explain("executionStats")

  console.log(result)

  await mongoose.disconnect()
}

main()