const { Router } = require("express")
const fs = require("fs/promises");

const cartsManager = require("../../dao/managers/CartsManager.js");
const CartModel = require("../../dao/models/cartModel.js")
const router = Router();

// /api/carts/
router.get("/", async (req, res) => {

  const { search, max, min, limit } = req.query;
  const carts = await cartsManager.getAll();

  let filtrados = carts;

  if (search) {
    filtrados = filtrados.filter(
      (p) =>
        p.keywords.includes(search.toLowerCase()) ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (min || max) {
    filtrados = filtrados.filter(
      (p) => p.price >= (+min || 0) && p.price <= (+max || Infinity)
    );
  }

  res.send(filtrados);
});

// /api/carts/:cid
router.get("/:cid", async (req, res) => {
  try {
    const id = req.params.cid;
    const cart = await cartsManager.getPopulate(id);

    if (!cart) {
      res.status(404).send("No se encuentra un carrito de compras con el identificador proporcionado");
    } else if (cart.products.length === 0) {
      res.status(201).send("Este carrito no contiene productos seleccionados");
    } else {
      res.status(201).send(cart);
    }
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).send("Ocurrió un error al obtener el carrito");
  }
});

// /api/carts/
router.post("/", async (req, res) => {
  const { body, io} = req;

  const carts = await CartModel.create(body);

  io.emit("newProduct", carts)

  res.status(201).send(carts);
});

// /api/carts/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await cartsManager.delete(id);

    if (result) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.sendStatus(500);
  }
});


module.exports = router;
