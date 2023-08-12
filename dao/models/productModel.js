const {Schema, model} = require ("mongoose")
const paginate = require ("mongoose-paginate-v2")

const schema = new Schema({ 
    title: {type: String, index: true},
    description: String,
    price: {type:Number, index: true},
    thumbnail:String,
    code: String,
    stock:Number,
})

schema.plugin(paginate)

const productModel = model("products", schema)

module.exports = productModel


