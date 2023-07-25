import { request } from "express";
import CartsService from "../services/cartsService.js";
import ProductsService from "../services/productsService.js";
import TicketService from "../services/ticketService.js";

const ticketManager = new TicketService
const productsService = new ProductsService
const cartsService = new CartsService

class CartsController {
    createCart = async (req = request, res) => {
        let cart = await cartsService.createCart()

        res.send({mensaje: "carrito creado", payload: cart})
    }

    getCartProducts = async (req = request, res) => {
        const { cid } = req.params
        const {limit = 1 , page = 1, query} = req.query
        try {
            const cartProducts = await cartsService.getCartProducts(cid, limit, page)
            
            res.send(cartProducts)
        } catch (error) {
            req.logger.error(error)
        }
    }

    newProduct = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            let data = await cartsService.uploadProduct(cid, pid)

            res.send({mensaje: "producto agregado al carrito", payload: data})

        } catch (error) {
            req.logger.error(error)
        }
    }

    deleteProduct = async (req = request, res) => {
        const { cid, pid } = req.params
        req.logger.info(`cid: ${cid}, pid: ${pid}`)
        try {
            let data = await cartsService.deleteProduct(cid, pid)

            res.send({mensaje: "producto eliminado del carrito", payload: data})

        } catch (error) {
            req.logger.error(error)
        }
    }

    uploadProduct = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.uploadProduct(cid, pid)

            res.send({mensaje: "producto agregado al carrito"})

        } catch (error) {
            req.logger.error(error)
        }
    }

    deleteCartProducts = async (req = request, res) => {
        const { cid } = req.params

        try {
            await cartsService.deleteCartProducts(cid)

            res.send({mensaje: "todos los productos eliminados del carrito"})

        } catch (error) {
            req.logger.error(error)
        }
    }

    arrayProductsUpdate = async (req = request, res) => {
        const { cid } = req.params
        const data = req.body

        try {
            await cartsService.arrayProductsUpdate(cid, data)

            res.send({mensaje: "Array de productos agregado al carrito"})

        } catch (error) {
            req.logger.error(error)
        }
    }

    createTicket = async(req = request, res) => {
        const { cid } = req.params

        try {
            let ticket = await ticketManager.createTicket(cid, req.session.email)
            console.log('ticket: ', ticket)
            res.send({
                status: "success",
                payload: ticket
            })
        } catch (error) {
            req.logger.error(error)
        }
    }
}

export default CartsController