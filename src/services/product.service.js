import ProductRepository from "../repository/products.repository.js";

class ProductService {
    async getProducts(options){
        return await ProductRepository.getProducts(options);
    }
    async getProductById(id){
        return await ProductRepository.getProductById(id);
    }
    async addProduct(productData){
        return await ProductRepository.addProduct(productData);
    }
    async updateProduct(id, productData) {
        return await ProductRepository.updateProduct(id, productData);
    }
    async deleteProduct (id) {
        return await ProductRepository.deleteProduct(id);
    }
}

export default new ProductService();