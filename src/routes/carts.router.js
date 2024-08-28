const express = require("express");
const router = express.Router();
const CartManager = require("../managers/db/cart-managers-db.js");
const cartManager = new CartManager();

//Array para almacenar usuarios: 
router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).send("Error del servidor, que no sirve para nada");
    }
})

router.get("/:cid", async (req, res) => {
    const carritoID = req.params.cid;
    try {
        const carritoBuscado = await cartManager.getCarritoById(carritoID);
        res.json(carritoBuscado.productos);
    } catch (error) {
        res.status(500).send("Error del servidor al buscar un carrito loco");
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    const carritoId = req.params.cid;
    const productoId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const carritoActualizado = await cartManager.agregarProductoAlCarrito(carritoId, productoId, quantity);
        res.json(carritoActualizado.productos);
    } catch (error) {
        res.status(500).send("Error al ingresar un producto al carrito");
    }
})

module.exports = router;

