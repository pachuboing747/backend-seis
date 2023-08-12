
const chatModel = require ("../models/messages")

class ChatManager {
    getAll(){
        return chatModel.find().lean()
    }
    create(message){
        return chatModel.create(message)
    }
}

module.exports = new ChatManager