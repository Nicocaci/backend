import CartModel from "./models/cart-model.js";
import ProductModel from "./models/product-model.js";


class CartDao {
    async create() {
        const nuevoCarrito = new CartModel();
        return await nuevoCarrito.save();
    }

    async findCartById(cartId) {
        return await CartModel.findById(cartId).populate("products.product")
    }

    async addProductToCart(cartId,productId,quantity) {
        const cart = await CartModel.findById(cartId);
        if(!cart) {
            throw new Error("Carrito no encontrado");
        }
        const product = ProductModel.findById(productId);
        if(!product){
            throw new Error("Producto no encontrado")
        }

        // Verificamos si el producto ya existe en el carrito
        const productIndex = cart.products.findIndex((p) => p.product.toString()=== productId);

        if(productIndex !== -1) {
            //Si el producto ya existe incrementamos la cantidad
            cart.products[productIndex].quantity += quantity;
        } else{ 
        // Si el producto no existe, agregarlo al carrito 
        cart.products.push({ product: productId, quantity});
        }
        return await cart.save();
    }
    
    async removeProductFromCart(cartId, productId) {
        const cart = new CartModel.findById(cartId);
        if(!cart) {
            throw new Error("Carrito no encontrado");
        }
        cart.products = cart.products.filter((p) => p.product._id.toString() !== productId.toString());
        return await cart.save();
    }

    async updateCart(cartId, products) {
        return await CartModel.findByIdAndUpdate(cartId, { products}, { new:true});

    }
    async updateProductQuantity(cartId,productId,quantity) {
        const cart = new CartModel.findById(cartId);
        if(!cart){
            throw new Error("Carrito no encontrado");
        }

        const productIndex = cart.products.findIndex((p) => p.product.toString()=== productId);
        if(productIndex !== -1) {
            cart.products [productIndex].quantity = quantity;
        } else {
            throw new Error("Producto no encontrado en el carrito");
        }
        return await cart.save()

    }

    async deleteCart(cartId) {
        return await CartModel.findByIdAndDelete(cartId)
    }
    }

    export default new CartDao();