const VinoModel = require('../../model/vinos.model.js')


class ProductManager {

    async addProduct({ title, description, price,}) {
        try {

            if (!title || !description || !price) {
                console.log("Todos los campos son obligatorios");
                return;
            }
    
            //2) Validacion: 
            const nuevoVino = new VinoModel ({
                title,
                description,
                price,
            });
    
            // GUARDAMOS EL NUEVO VINO
    
            await nuevoVino.save();
        } catch (error) {
            console.log("Error al agregar el vino")
        }
    }

    async getProducts() {
        try {
            const arrayProductos = await VinoModel.find(); 
            return arrayProductos;
        } catch (error) {
            console.log("Error al encontrar producto", error); 
        }

    }

    async getProductById(id) {
        try {
                const vinoBuscado = await VinoModel.findById(id);

            if (!vinoBuscado) {
                console.log("producto no encontrado"); 
                return null; 
            }
                console.log("Producto encontrado"); 
                return buscado; 
        } catch (error) {
            console.log("Error al buscar por id", error); 
        }
    }

    

    //Método para actualizar productos: 

    async updateProduct(id, productoActualizado) {
        try {
            const vinoActualizado = await VinoModel.findByIdAndUpdate(id, productoActualizado);

            if(!vinoActualizado){
                console.log("No se encuentra ese vino");
                return null;
            }

            return vinoActualizado
        } catch (error) {
            console.error("Tenemos un error al actualizar productos", error); 
            throw error; // Lanzar el error para que el controlador pueda manejarlo
        }
    }

    async deleteProduct(id) {
        try {
            const vinoEliminiado = await VinoModel.findByIdAndDelete(id);

            if(!vinoEliminiado){
                console.log("Vino sin stock");
                return null;
            }

            return vinoEliminiado;
        } catch (error) {
            console.log("Tenemos un error al eliminar productos"); 
        }
    }

}

module.exports = ProductManager; 