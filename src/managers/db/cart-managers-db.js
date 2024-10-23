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

    // METODO QUE DEVUELVE CARRITO SEGUN ID
    
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
    // Metodo que  agrega producto nuevo al carrito 
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

//  METODO PARA BORRAR PRODUCTO DEL CARRITO

    // async borrarProductoDelCarrito (carritoId,productoId)
// METODO PARA ACTUALIZAR PRODUCTO DEL CARRITO




// METODO PARA VACIAR CARRITO
    async vaciarCarrito (carritoId) {
        try {
            const eliminar = await CartModel.findByIdAndUpdate(carritoId,{$set:{productos:[]}},{new:true});
            console.log("Carrito vaciado")
        } catch (error) {
            console.log("Error al vaciar el carrito");
            throw error;
            
        }
    }
}

module.exports = CartManager; 