import { request } from "express";
import PaymentService from '../ultis/stripe.js'
import UserService from "../services/userService.js";
import CartsService from "../services/cartsService.js";
import TicketService from "../services/ticketService.js";

const userService = new UserService
const cartsService = new CartsService
const ticketService = new TicketService

class PaymentController{

    paymentIntent = async (req = request, res) => {
        try {
            let user = await userService.getUser(req.session)
            
            let ticket = await ticketService.createTicket(user.cart, user.email)
            req.logger.info(ticket)
            const paymentIntentInfo = {
                amount: ticket.amount,
                currency: 'usd'
            }
        
            const service = new PaymentService()
            let result = await service.createPaymentIntent(paymentIntentInfo)
            console.log("result: ", result)
            res.send({status: 'success',payload: result})
        } catch (error) {
            req.logger.error(error);
        }
    }
}

export default PaymentController