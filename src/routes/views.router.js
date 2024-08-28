const express = require("express");
const router = express.Router();
const ProductManager = require ("../managers/product-manager.js");
const VinoModel = require('../model/vinos.model.js');
// const manager = new ProductManager ("./src/data/productos.json")



router.get("/", async(req,res) =>{
    const vinos = await VinoModel.find().lean();
    // const nuevoArray = vinos.map(vino => {
    //     return{
    //         id: vino._id,
    //         title: vino.title,
    //         description: vino.description,
    //         price: vino.price,
    //         path: vino.path

    //     }
    // })

    res.render("index", {vinos});
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