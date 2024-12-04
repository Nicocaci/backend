import ProductDao from '../dao/products.dao.js';

class ProductRepository {
    async getProducts(options) {
        return await ProductDao.getProducts(options);
    }

    async getProductById(id) {
        return await ProductDao.getProductById(id)
    }

    async addProduct(productData){
        return await ProductDao.addProduct(productData);
    }

    async updateProduct(id, productData){
        return await ProductDao.updateProduct(id,productData);
    }

    async deleteProduct(id){
        return await ProductDao.deleteProduct(id);
    }
}

export default new ProductRepository();
