const { Router } = require("express")
const productManager =require("../../dao/managers/ProductManager")

const router = Router();


// /api/products/
router.get("/", async (req, res) => {
  const { search, max, min, limit } = req.query;
  const products = await productManager.getAll();

  let filtrados = products;

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

// /api/productos/
router.post("/", async (req, res) => {
  const { body, io} = req;

  const product = await productManager.create(body);
  console.log(product);

  io.emit("newProduct", product)

  res.status(201).send(product);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productManager.getById(id)

    if(!product){
      res.sendStatus(404)
      return
    }

    res.send(product)
  }catch(error){
    console.log(error);
    res.sendStatus(500)
      return
  }

    
});

// /api/productos/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const result = await productManager.update(id, body)

    console.log(result)
    if (result){
      res.sendStatus(202);
      return
    }
    res.sendStatus(404);
  } catch (e) {
    res.status(500).send({
      message: "Ha ocurrido un error en el servidor",
      exception: e.stack,
    });
  }
});

// /api/productos/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await productManager.delete(id);

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


router.post("/addProduct", async (req, res) => {
  const { title, description,price,thumbnail, code, stock} = req.body;

  try {
    await productManager.create({ title, description,price,thumbnail, code, stock});
    res.sendStatus(200);
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.sendStatus(500);
  }
});

router.get("/getProducts", async (req, res) => {
  try {
    const products = await productManager.getAll();
    res.json(products || []);
  } catch (error) {
    console.log("El carrito esta vacio:");
    res.sendStatus(500);
  }

});

router.post("/deleteProducts", async (req, res) => {
  try {
    await productManager.deleteAll();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error al eliminar los productos:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
