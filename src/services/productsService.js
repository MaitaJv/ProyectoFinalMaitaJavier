import { MongoProductManager } from "../dao/mongo/mongoProductManager.js";
import {ProductsDTO} from "../DTO/productsDTO.js";
import UserService from "./userService.js";
const productsDTO = new ProductsDTO()
const mongoProductManager = new MongoProductManager

const userService = new UserService
class ProductsService {
    async getProducts(limit){
        return await mongoProductManager.getProducts(limit)
    }
    async getProductsWithOutPaginate(){
        return await mongoProductManager.getProductsWithOutPaginate()
    }

    async getProductById(pid){
        return await mongoProductManager.getProductById(pid)
    }

    async addProduct({title, description, price, thumbnail, code, stock, category, owner}){
        let user = await userService.getUser(owner)
        if (!user) {
            console.log('el usuario no se encuentra registrado por lo que no puede ser dueño de este producto')
            return -1
        }
        let product = await productsDTO.addProduct({title, description, price, thumbnail, code, stock, category, owner})
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