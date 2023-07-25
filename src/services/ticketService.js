import { TicketManager } from "../dao/mongo/MongoTicketManager.js";
import CartsService from "./cartsService.js";
import ProductsService from "./productsService.js";

const ticketManager = new TicketManager
const cartsService = new CartsService
const productsService = new ProductsService	
class TicketService{
    async createTicket(cid, email){
        try {
            let sbProducts = []
            let amount = 0

            const cartProducts = await cartsService.getAllCartProducts(cid)
            if(!cartProducts) return res.status(401).send({status: 'error', error:  cartProducts})
            for (const products of cartProducts) {

                for (const product of products.products) {
                    console.log(product);
                    if (product.quantity < product.pid.stock) {
                        
                        let updateProduct = {
                            owner: product.pid.owner,
                            thumbnail: product.pid.thumbnail,
                            category: product.pid.category,
                            stock: product.pid.stock,
                            status: product.pid.status,
                            price: product.pid.price,
                            code: product.pid.code,
                            description: product.pid.description,
                            title: product.pid.title
                        }
                        
                        updateProduct.stock = updateProduct.stock - product.quantity
                        
                        amount += product.pid.price * product.quantity
                        console.log('updateProduct: ', updateProduct)
                        
                        await productsService.updateProduct(product.pid._id, updateProduct)
                        
                    }else{
                        sbProducts.push(product)
                    }
                }
            }
            console.log("sbProducts: ", sbProducts)
            console.log("cartProducts: ", cartProducts)
            if(sbProducts.length == cartProducts[0].products.length) return {status: 'error', error:  sbProducts}
            
            await cartsService.arrayProductsUpdate(cid, sbProducts)
            console.log('sbProducts: ', sbProducts)
            let purchase_datetime = new Date()
            console.log("email: ", email)
            let purchaser = email || "prueba@gmail.com"
            console.log('cosas:', amount, purchaser, purchase_datetime.toString())

            return await ticketManager.createTicket(purchase_datetime, amount, purchaser)
        } catch (error) {
            console.log(error);
        }
    }
}

export default TicketService