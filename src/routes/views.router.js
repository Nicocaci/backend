const express = require("express");
const router = express.Router();
const ProductManager = require ("../managers/product-manager.js")
const manager = new ProductManager ("./src/data/productos.json")



router.get("/products", async(req,res) =>{
    const productos = await manager.getProducts();

    res.render("index", {productos});
})


router.get('/realtimeproducts', async (req, res) => {
    //solo con websockets, al crear o eñliminar productos se actualiza atumaticamente la vista
    try {
        const products = await manager.getProducts()
        res.render("realTimeProducts", {title:'RealTimeProducts',products})
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
})



module.exports = router