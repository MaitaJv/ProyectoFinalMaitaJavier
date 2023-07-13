import { MongoCartManager } from "../dao/mongo/MongoCartManager.js";
import { MongoProductManager } from "../dao/mongo/mongoProductManager.js";

const mongoProductManager = new MongoProductManager
const mongoCartManager = new MongoCartManager

class ViewsService{
    async getProducts(limit, page, filtro){
        return await mongoProductManager.getProducts(limit, page, filtro)
    }

    async getCartProducts(cid, limit, page){
        return await mongoCartManager.getCartProducts(cid, limit, page)
    }
}

export default ViewsService