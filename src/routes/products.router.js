import express from "express";
import ProductController from "../controllers/products.controller.js"
import passport from "passport";
const router = express.Router();

//Ruta para obtener productos con paginacion 
router.get("/", passport.authenticate("jwt", { session: false}), ProductController.getProducts);

//Ruta para obtener un producto por id

router.get("/:pid", ProductController.getProductById);

//Ruta para agregar un nuevo producto
router.post("/", ProductController.addProduct);

//Ruta para actualizar un producto por ID

router.put(":pid", ProductController.updateProduct);

//Ruta para eliminar un producto por ID

router.delete("/:pid", ProductController.deleteProduct);

export default router;





// // Rutas

// // Obtener todos los productos o limitados por query param
// router.get("/", async (req, res) => {
//     const arrayProductos = await manager.get();
//     res.send(arrayProductos);
// })

// // Obtener producto por ID
// router.get("/:pid", async (req, res) => {
//     let id = req.params.pid;
//     try {
//         const producto = await manager.getProductById((id));


//         if (!producto) {
//             res.status(404).send("Producto no encontrado");
//         } else {
//             res.send(producto);
//         }
//     } catch (error) {
//         res.status(500).send("Error al buscar ese id en los productos");
//     }
// });

// // Agregar un nuevo producto
// router.post("/", async (req, res) => {
//     const nuevoProducto = req.body;
//     try {
//         await manager.addProduct(nuevoProducto);
//         res.status(201).json({
//             message: "Producto agregado exitosamente"});
//     } catch (error) {
//         res.status(500).json({status: "error", message: error.message});
//     }
// });


// // Actualizar un producto por ID
// router.put("/:pid", async (req, res) => {
//     const id = req.params.pid;
//     const productoActualizado = req.body;
//     console.log('Product ID:', id);
//     console.log('Updates:', productoActualizado);
//     try {
//             await manager.updateProduct(id,productoActualizado);
//             res.status(201).json({
//                 message: "Producto actualizado correctamente"
//             })
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send({ message: 'Error al actualizar el producto', error });
//     }
// });

// // Eliminar un producto por ID
// router.delete("/:pid", async (req, res) => {
//     const productId = req.params.pid;
//     try {
//         await manager.deleteProduct(productId);
//         res.status(201).json({
//             message: "Producto eliminado correctamente"
//         })
//     } catch (error) {
//         res.status(500).send({ message: 'Error al eliminar el producto', error });
//     }
// });

// module.exports = router;
