const express = require("express");
const ProductManager = require("../managers/db/product-managers-db.js");
const manager = new ProductManager();
const router = express.Router();

// Rutas

// Obtener todos los productos o limitados por query param
router.get("/", async (req, res) => {
    const arrayProductos = await manager.get();
    res.send(arrayProductos);
})

// Obtener producto por ID
router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const producto = await manager.getProductById((id));


        if (!producto) {
            res.status(404).send("Producto no encontrado");
        } else {
            res.send(producto);
        }
    } catch (error) {
        res.status(500).send("Error al buscar ese id en los productos");
    }
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
    const nuevoProducto = req.body;
    try {
        await manager.addProduct(nuevoProducto);
        res.status(201).json({
            message: "Producto agregado exitosamente"});
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});


// Actualizar un producto por ID
router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const productoActualizado = req.body;
    console.log('Product ID:', id);
    console.log('Updates:', productoActualizado);
    try {
            await manager.updateProduct(id,productoActualizado);
            res.status(201).json({
                message: "Producto actualizado correctamente"
            })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: 'Error al actualizar el producto', error });
    }
});

// Eliminar un producto por ID
router.delete("/:pid", async (req, res) => {
    const productId = req.params.pid;
    try {
        await manager.deleteProduct(productId);
        res.status(201).json({
            message: "Producto eliminado correctamente"
        })
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el producto', error });
    }
});

module.exports = router;
