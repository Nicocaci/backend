import express from "express";
const router = express.Router();
import CartManager from "../dao/db/cart-manager-db.js"
const cartManager = new CartManager();
import CartModel from "../dao/models/cart-model.js";
import CartController from "../controllers/cart.controller.js";
import ProductModel from "../dao/models/product-model.js";
import UserModel from "../dao/models/user-model.js";
import TicketModel from "../dao/models/ticket-model.js";
import { calcularTotal } from "../utilis/util.js";
import cartController from "../controllers/cart.controller.js";

//Crear un nuevo Carrito
router.post("/", CartController.creatCart);


//Obtener los productos de un carrito
router.get("/:cid", cartController.getCartProducts);

//Agregar productos a un carrito

router.post("/:cid/product/:pid", CartController.addProductToCart);

//Obtener todos los carritos

router.get("/", CartController.getAllCarts);

//Eliminar un carrito

router.delete("/:cid", CartController.deleteCart);

//Eliminar un producto de un carrito

router.delete("/:cid/product/:pid", CartController.deleteProductFromCart);

//Actualizar un carrito 

router.put("/:cid", CartController.updateCart);

//Actualiar cantidad de productos en un carrito

router.put(":cid/products/:pid", CartController.updateProductQuantity);

router.get("/:cid/purchase", async (req, res) =>{
    const carritoId = req.params.cid;
    try {
        const carrito = await CartModel.findById(carritoId);
        const arrayProductos = carrito.products;

        const productosNoDisponibles = [];
        const productosComprados =[];

        for (const item of arrayProductos) {
            const productId = item.product;
            const product = await ProductModel.findById(productId);
            if( product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await product.save();
                productosComprados.push(item)
            } else{
                productosNoDisponibles.push(item);
            }
        }

        const usuarioDelCarrito = await UserModel.findeOne({cart: carritoId});

        const ticket = new TicketModel({
            purchase_datatime: new Date(),
            amount: calcularTotal(productosComprados),
            purchaser: usuarioDelCarrito.email
        });

        await ticket.save();

        carrito.products = productosNoDisponibles;

        await carrito.save();

        res.json({
            message: "Compra generada",
            ticket: {
                id: ticket._id,
                amount: ticket.amount,
                purchaser: ticket.purchaser,
            },
            productosNoDisponibles: productosNoDisponibles.map((item) => item.product),
        });
    } catch (error) {
        res.status(500).send("Error del servidor al crear ticket");
    }
});

export default router;



// //Array para almacenar usuarios: 
// router.post("/", async (req, res) => {
//     try {
//         const nuevoCarrito = await cartManager.crearCarrito();
//         res.json(nuevoCarrito);
//     } catch (error) {
//         res.status(500).send("Error del servidor, que no sirve para nada");
//     }
// })

// router.get("/:cid", async (req, res) => {
//     const carritoID = req.params.cid;
//     try {
//         const carritoBuscado = await cartManager.getCarritoById(carritoID);
//         res.json(carritoBuscado.productos);
//     } catch (error) {
//         res.status(500).send("Error del servidor al buscar un carrito loco");
//     }
// })

// router.post("/:cid/product/:pid", async (req, res) => {
//     const carritoId = req.params.cid;
//     const productoId = req.params.pid;
//     const quantity = req.body.quantity || 1;

//     try {
//         const carritoActualizado = await cartManager.agregarProductoAlCarrito(carritoId, productoId, quantity);
//         res.json(carritoActualizado.productos);
//     } catch (error) {
//         res.status(500).send("Error al ingresar un producto al carrito");
//     }
// })


// router.delete("/:cid/product/:id", async (req,res) => {
//     const carritoId = req.params.cid;
//     const productoId = req.params.pid;
    
//     try {
//         const eliminarCarrito = await cartManager.vaciarCarrito(carritoId,productoId);
//         res.status(201).json({
//             message: "Carrito Eliminado correctamente"
//         })
//     } catch (error) {
//         res.status(500).send("Error al eliminar carrito")
//     }
// })
// module.exports = router;

