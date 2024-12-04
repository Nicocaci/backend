import CartService from "../services/cart.service.js"

class CartController {
    async creatCart(req,res){
        try {
            const newCart = await CartService.createCart();
            res.json(newCart);
        } catch (error) {
            console.error("Error al crear un nuevo carrito", error);
            res.status(500).json({error:"Error interno del servidor"})
            
        }
    }

    async getCartProducts(req,res){
        const cartId = req.params.cid;
        try {
            const cart = await CartService.getCartProducts(cartId);
            if (!cart){
                return res.status(404).json({ error: "Carrito no encontrado"});
            }
            res.json(cart.products);
        } catch (error) {
            console.error("Error al obtener el carrito", error);
            res.status(500).json({error: "Error interno del servidor"});
        }
    }

    async addProductToCart(req,res){
        const cartId = req.parms.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity || 1;
        try {
            const updateCart = await CartService.addProductToCart(cartId, productId, quantity);
            res.json(updateCart.products)
        } catch (error) {
            console.error("Error al agregar producto al carrito", error);
            res.status(500).json({ error: "Error interno del servidor"});
        }
    }

    async getAllCarts(req,res){
        try {
            const carts = await CartService.getAllCarts();
            res.json(carts);
        } catch (error) {
            console.error("Error al obtener carritos", error);
            res.status(500).json({ error: "Error interno del servidor"});
        }
    }

    async getCartById(req,res){
        const cartId = req.params.cid;
        try {
            const carritoId = await CartService.getCartById(cartId);
            res.json(carritoId)
        } catch (error) {
            console.error("No hay carrito con ese Id");
            res.status(500).json({ error: "Error interno del servidor"});
        }
    }

    async deleteCart(req,res){
        const cartId = req.params.cid;
        try {
            const result = await CartService.deleteCart(cartId);
            if(!result) {
                return res.status(404).json({ error: "Carrito no encontrado"});
            }
            res.json({message: "Carrito eliminado exitosamente"});
        } catch (error) {
            console.error("Error al eliminar carrito", error);
            res.status(500).json({error: "Error interno del servidor"});
        }
    }

    async updateCart(req,res){
        const cartId = req.params.cid;
        const products = req.body.products;
        try {
            const updateCart = await CartService.updateCart(cartId, products);
            if(!updateCart){
                return res.status(404).json({error: "Carrito no encontrado"});
            }
            res.json({ message: "Carrito actualizado exitosamente", carrito: updateCart});
        } catch (error) {
            console.error("Error al actualizar el carrito", error);
            res.status(500).json({error: "Error interno del servidor"});
        }
    }
    async deleteProductFromCart(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        try {
            const updatedCart = await cartService.deleteProductFromCart(cartId, productId);
            if (updatedCart) {
                res.json({ message: "Producto eliminado del carrito exitosamente", carrito: updatedCart });
            } else {
                res.status(404).json({ error: "Carrito o producto no encontrado" });
            }
        } catch (error) {
            console.error("Error al eliminar producto del carrito", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async updateProductQuantity(req,res){
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const {quantity} = req.body;
        if(!quantity || quantity < 1 ) {
            return res.status(400).json({error: "La cantidad debe ser un numero positivo"});
        }
        try {
            const updateCart = await CartService.updateProductQuantity(cartId,productId,quantity);
            if (!updateCart) {
                return res.status(404).json( { error: " Carrito o producto no encontrado"});
            }
            res.json({message: "Cantidad de productos actualizado exitosamente"});
        } catch (error) {
            console.error("Error al actualizar la cantidad de producto");
            res.status(500).json({message: "Error interno del servidor"});
        }
    }
}


export default new CartController();