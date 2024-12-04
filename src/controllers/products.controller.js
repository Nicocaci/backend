import productService from "../services/product.service.js";

class ProductController {
    async getProducts(req,res){
        try {
            const { limit = 10, page = 1, sort, query} = req.query;
            const productos = await productService.getProducts({limit, page,sort,query});
            res.json({
                status:"succes",
                payload: productos,
                totalPages: productos.totalPages,
                prevPage: productos.prevPage,
                nextPage: productos.nextPage,
                page: productos.page,
                hasPrevPage: productos.hasPrevPage,
                hasNextPage: productos.hasNextPage,
                prevLink: productos.hasPrevPage ? `/api/products?limit=${limit}&page=${productos.prevPage}&sort=${sort}&query=${query}` : null,
                nextLink: productos.hasNextPage ? `/api/products?limit=${limit}&page=${productos.nextPage}&sort=${sort}&query=${query}` : null,
            });
        } catch (error) {
            console.error("Error al obtener productos", error);
            res.status(500).json({message: "Error interno del servidor"})
        }
    }

    async getProductById(req,res){
        const id = req.params.pid;
        try {
            const productId = await productService.getProductById(id);
            if(!productId){
                res.status(404).json({error:"No existe el producto"}, error);
            }
            res.json(productId);
        } catch (error) {
            console.error("Error al obtener el producto");
            res.status(500).json({message: "Error interno del servidor"});
        }
    }

    async addProduct(req,res){
        const productData = req.body;
        try {
            await productService.addProduct(productData);
            res.status(201).json({message: "Producto agregado correctamente"});

        } catch (error) {
            console.error("Error al agregar el producto", error);
            res.status(500).json({error: "Error interno del servidor"});
        }
    }

    async updateProduct(req,res){
        const id = req.params.pid;
        const productData = req.body;
        try {
            await productService.updateProduct(id,productData);
            res.status(500).json({message: "Producto actualizado exitosamente"})
        } catch (error) {
            console.error("Error al actualizar el producto");
            res.status(500).json({error:"Error interno del servidor"});
        }
    }

    async deleteProduct(req,res) {
        const id = req.params.pid;
        try {
            await productService.deleteProduct(id);
            res.status(201).json({message: "Producto eliminado correctamente"});
        } catch (error) {
            console.error("Error al eliminar el producto", error);
            res.status(500).json({error:" Error interno del servidor"});
        }
    }
}

export default new ProductController();
