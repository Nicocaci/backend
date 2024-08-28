const CartModel = require("../../model/cart.model.js")

class CartManager {
    //Metodo para crear un carrito: 

    async crearCarrito() {
        try {
            const nuevoCarrito = new CartModel({productos: []})
            await nuevoCarrito.save();
            return nuevoCarrito;
        } catch (error) {
            console.log("Error al crear carrito nuevo");
            
        }
    }

    async getCarritoById(id) {
        try {
            const carrito = await CartModel.findById(id)
            if(!carrito){
                throw new Error ("No hay carrito con ese id")
            }
            return carrito;
        } catch (error) {
            console.log("No se encuentra este carrito");
            throw error;
        }
    }

    async agregarProductoAlCarrito(carritoId, productoId, quantity = 1) {
        try {
            const carrito = await this.getCarritoById(carritoId);
            const existeProducto = carrito.productos.find(p => p.producto.toString() === productoId);
            //De esta forma chequeo si el producto que estoy recibiendo para agregar al carrito ya esta presente en el. Si existe modifico la cantidad, si no existe lo agrego. 
    
            if (existeProducto) {
                existeProducto.quantity += quantity;
            } else {
                carrito.productos.push({ producto: productoId, quantity });
            }
    
            //Como aca modifique el carrito, ahora tengo que guardar en el archivo: 
            carrito.markModified("productos");
            await carrito.save();

            return carrito;

        } catch (error) {
            console.log("error")
        } 
    }

}

module.exports = CartManager; 