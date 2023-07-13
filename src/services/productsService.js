import { MongoProductManager } from "../dao/mongo/mongoProductManager.js";
import {ProductsDTO} from "../DTO/productsDTO.js";
const productsDTO = new ProductsDTO()
const mongoProductManager = new MongoProductManager

class ProductsService {
    async getProducts(limit){
        return await mongoProductManager.getProducts(limit)
    }

    async getProductById(pid){
        return await mongoProductManager.getProductById(pid)
    }

    async addProduct({title, description, price, thumbnail, code, stock, status, category}){
        let product = await productsDTO.addProduct({title, description, price, thumbnail, code, stock, status, category})
        console.log("producto: ",product)
        return await mongoProductManager.addProduct(product)
    }

    async updateProduct(pid, obj){
        return await mongoProductManager.updateProduct(pid, obj)
    }

    async deleteProduct(pid){
        return await mongoProductManager.deleteProduct(pid)
    }
}

export default ProductsService