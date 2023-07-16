import productsModel from "./models/products.js"

export class MongoProductManager{

    async addProduct(product){
        try {
            return await productsModel.create(product)
        } catch (error) {
            console.log(error)
        }
    }

    async getProducts(limit, page, filtro){
        try {
            let products = await productsModel.paginate(filtro, {limit: 10, page: page, lean: true})
            if (!limit) {
                return products
            }
            return products = await productsModel.paginate(filtro, {limit: limit, page: page, lean: true})
        } catch (error) {
            console.log(error)
        }
    }

    async getProductsWithOutPaginate(){
        try {
            let products = await productsModel.find()
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(pid){
        try {
            const data = await productsModel.find()
    
            return data.find(product => product.id == pid)
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(pid, obj){
        try {
            await productsModel.findOneAndReplace({_id: pid}, obj)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(pid){
        try {
            await productsModel.findOneAndDelete({_id: pid})
        } catch (error) {
            console.log(error)
        }
    }
}