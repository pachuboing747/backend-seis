const{ Router } = require("express");
const ProductRoutes = require ("./api/Products-router.js");
const CartsRoutes = require ("./api/Cart-router.js");
const HomeRoutes = require ("./api/Home-router.js");

const api = Router()

// rutas de productos
api.use("/products", ProductRoutes)

// rutas del carrito
api.use("/carts", CartsRoutes)

const home = Router ()

home.use("/", HomeRoutes)


module.exports = {
    api, 
    home,
};