const {Router} = require ("express");
const productManager =require("../../dao/managers/ProductManager.js")
const cartsManager = require ("../../dao/managers/CartsManager.js")

const router = Router()


router.get("/", async (req, res) => {
    const { page = 1, limit = 10, sort, query } = req.query;
 
    const pageValue = parseInt(page);
    const limitValue = parseInt(limit);
 
    const { docs: products, ...pageInfo } = await productManager.getAllPaginate(pageValue, limitValue);
  
    let filteredProducts = products;
    if (query) {
      filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    if (sort === "asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    pageInfo.prevLink = pageInfo.hasPrevPage ? `http://localhost:8080/?page=${pageInfo.prevPage}` : "";
    pageInfo.nextLink = pageInfo.hasNextPage ? `http://localhost:8080/?page=${pageInfo.nextPage}` : "";
  
    res.render("home", {
      title: "Productos",
      products: filteredProducts,
      pageInfo,
      style: "home"
    });
    
  });
  

router.get("/carts", async(req, res)=>{

    const carts = await cartsManager.getAll()
    res.render("carts", {
        title: "Carrito",
        carts,
        style: "carrito"
    })
})

router.get("/realTimesProducts", async(req, res)=>{

    const products = await productManager.getAll()
    res.render("realTimesProducts", {
        title: "RealTimesProducts",
        products,
        style: "realTime"
    })
    
})

router.get("/chat", (req, res)=>{
    res.render("chat",{
        title: "Chat",
        style:"home"
    })
    
})

router.post("/realTimesProducts", async (req, res) => {
    try {
      const requestData = req.body;
      const response = { message: "Solicitud POST exitosa", data: requestData };
      res.status(200).json(response);
    } catch (error) {
    
      const errorMessage = "Ocurrió un error durante el procesamiento de la solicitud POST.";
      res.status(500).json({ error: errorMessage });
    }
});

router.get("/products", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const pageValue = parseInt(page);
  const limitValue = parseInt(limit);

  const { docs: products, ...pageInfo } = await productManager.getAllPaginate(pageValue, limitValue);

  res.render("products", {
    title: "Productos",
    products,
    pageInfo,
    style: "products"
  });
});



  

module.exports = router;