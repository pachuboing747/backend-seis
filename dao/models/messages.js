const {Schema, model} = require ("mongoose")

const schema = new Schema({ 
   text: String,
   user: String,
   datetime: String,

})

const messagesModel = model("messages", schema)

module.exports = messagesModel