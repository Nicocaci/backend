const express = require("express");
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json");
const router = express.Router();

// Rutas

// Obtener todos los productos o limitados por query param
router.get("/", async (req, res) => {
    const limit = req.query.limit;
    try {
        const arrayProductos = await manager.getProducts();
        if (limit) {
            res.send(arrayProductos.slice(0, limit));
        } else {
            res.send(arrayProductos);
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
});

// Obtener producto por ID
router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const producto = await manager.getProductById(parseInt(id));
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
        console.log(nuevoProducto);
        await manager.addProduct(nuevoProducto);
        res.status(201).send("Producto agregado exitosamente");
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});

// Actualizar un producto por ID
// Actualizar un producto por ID
router.put("/:pid", async (req, res) => {
    const productId = req.params.pid;
    const updates = req.body;
    console.log('Product ID:', productId);
    console.log('Updates:', updates);
    try {
        const updatedProduct = await manager.updateProduct(parseInt(productId), updates);
        console.log('Updated Product:', updatedProduct);
        if (!updatedProduct) {
            res.status(404).send({ message: 'Producto no encontrado' });
        } else {
            res.status(200).send(updatedProduct);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: 'Error al actualizar el producto', error });
    }
});

// Eliminar un producto por ID
router.delete("/:pid", async (req, res) => {
    const productId = req.params.pid;
    try {
        const deletedProduct = await manager.deleteProduct(parseInt(productId));
        if (!deletedProduct) {
            res.status(404).send({ message: 'Producto no encontrado' });
        } else {
            res.status(200).send({ message: 'Producto eliminado correctamente', product: deletedProduct });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el producto', error });
    }
});

module.exports = router;
