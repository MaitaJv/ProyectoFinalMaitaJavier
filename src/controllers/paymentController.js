import { request } from "express";
import PaymentService from '../ultis/stripe.js'
import UserService from "../services/userService.js";
import CartsService from "../services/cartsService.js";

const userService = new UserService
const cartsService = new CartsService

class PaymentController{

    paymentIntent = async (req = request, res) => {
        try {
            let user = await userService.getUser(req.session)
            
            // const {docs} = await cartsService.getCartProducts(user.cart, limit = 1, page = 1)
            // let data = docs[0].products
            const paymentIntentInfo = {
                amount: 1000,
                currency: 'usd'
            }
        
            const service = new PaymentService()
            let result = await service.createPaymentIntent(paymentIntentInfo)
            req.logger.info(result)
            res.send({status: 'success',payload: result})
        } catch (error) {
            req.logger.error(error);
        }
    }
}

export default PaymentController