import CartModel from "../models/cart-model.js";

class CartManager{
    async crearCarrito() {
        try {
            const nuevoCarrito = new CartModel({products: []});
            await nuevoCarrito.save();
            return nuevoCarrito;
        } catch (error) {
            console.log("Error al crear el nuevo carrito de compras")
        }
    }

async getCarritoById(cartId) {
    try {
        const carrito = await CartModel.findById(cartId);
        if(!carrito) {
            console.log("No existe carrito con ese Id");
            return null
        }
    } catch (error) {
        console.log("Error al traer el carrito", error)
    }
}

async agregarProductoAlCarrito(cartId, productId, quantity = 1){
    try {
        const carrito = await this.getCarritoById(cartId)
        const existeProducto = carrito.products.find((item) => item.product.toString() === productId);
        if(existeProducto) {
            existeProducto.quantity += quantity;
        } else {
            carrito.products.push({ product: productId, quantity});
        }
        
        carrito.markModified("products");
        await carrito.save();
        return carrito;
    } catch (error) {
        console.log("Error al agregar un producto", error); 
    }
}

async getCarritos(){
 try {
    const carritos = await CartModel.find().populate("products.product", "_id title price");
    return carritos
 } catch (error) {
    console.log("Error al obtener todos los carritos", error);
    throw error
 }
}


async eliminarCarrito(cartId) {
try {
    const carritoEliminado = await CartModel.findByIdAndDelete(cartId);
    if(!carritoEliminado){
        console.log("No se encontro el carrito con el ID proporcionado");
        return null;
    } 
    console.log("Carrito eliminado correctamente");
    return carritoEliminado;
} catch (error) {
    console.log("Error al eliminar el carrito");
    throw error;
}
}

async eliminarProductoDelCarrito(cartId, productId){
    try {
        const carritoActualizado = await CartModel.findByIdAndUpdate(cartId, {$pull: {products: {product:productId}}}, {new: true});
        if(!carritoActualizado){
            console.log("No existe ese carrito con el id o el producto no se encontro en el carrito");
            return null;
        }
        console.log("Producto eliminado correctamente", carritoActualizado);
        return carritoActualizado;
    } catch (error) {
        console.log("Error al eliminar producto del carrito", error);
        throw error;
    }
}

async actualizarCarrito(cartId, products) {
    try {
        const carrito = await CartModel.findById(cartId);
        if (!carrito){
            console.log("No se encontro ningun carrito con ese Id");
            return null;
        }
        carrito.products = products;
        carrito.markModified("products");

        await carrito.save();
        console.log("Carrito actualizado correctamente", carrito);
        return carrito;
    } catch (error) {
        console.log("Error al actualizar el carrito", error);
        throw error;
    }
}

async actualiarCantidadProductos(cartId, productId, quantity) {
    try {
        const carrito = await CartModel.findById(cartId);
        if(!carrito){
            console.log("Error al encontrar el carrito con el Id");
            return null
        }

        const productUpdate = carrito.products.find((item) => item.product._id.toString() == productId);
        console.log(
            "producto en carrito:",
            carrito.products.find((item) => item.product.toString())
        );
        if (!productUpdate){
            console.log("Error al encontrar producto con ese Id");
            return null
        }

        productUpdate.quantity = quantity;
        //Marca la propiedad "products" como modificad antes de guardar
        carrito.markModified("products");

        await carrito.save();
        console.log("Carrito Actualizado exitosamente:", carrito);
        return carrito;
    } catch (error) {
        console.log("Error al actualizar la cantidad de productos", error)
        throw error
    }
}
}

export default CartManager;
