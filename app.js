(async () =>{
  const express = require("express");
  const http = require("http");
  const path = require("path");
  const handlebars = require("express-handlebars");
  const { Server } = require("socket.io");
  const mongoose = require ("mongoose")

  const cartRouter = require("./routes/api/Cart-router.js")
  const Routes = require("./routes/index.js");
  const socketManager = require ("./websocket/socketManager.js")

  try{
    
    await mongoose.connect("mongodb+srv://pachu1982721:VPXombCDAVDvOaVQ@cluster0.lvefot0.mongodb.net/ecommerce?retryWrites=true&w=majority")
    console.log("se ha conectado a la base de datos")
  }catch{
    console.log("no se podido conectar a la base de datos")
  }

  const app = express(); 
  const server = http.createServer(app);
  const io = new Server(server);
  
  app.engine("handlebars", handlebars.engine());
  app.set("views", path.join(__dirname, "/views"));
  app.set("view engine", "handlebars");
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/public", express.static(path.join(__dirname + "/public")));
  
  
  app.use("/", Routes.home);
  
  app.use("/api", (req, res, next)=>{
    req.io = io
    next()
  }, Routes.api,cartRouter)
  
  
  io.on("connection", socketManager)
  
  const port = 8080;
  server.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
  });

})()


