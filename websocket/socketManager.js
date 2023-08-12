const chatManager = require ("../dao/managers/chatManager")

async function socketManager(socket){

  const messages = await chatManager.getAll()
  console.log(`usuario conectado ${socket.id}`);

  socket.emit('chat-messages', messages)

  socket.on('chat-message', async(msg) => {
    console.log(msg)
    await chatManager.create(msg)
    socket.broadcast.emit('chat-message', msg)
  })
   
}

module.exports = socketManager;