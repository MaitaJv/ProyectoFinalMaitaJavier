import { request } from "express"
import ProductsService from "../services/productsService.js"
import UserService from "../services/userService.js"
import { createTransport } from 'nodemailer'
import config from '../config/env.js';

const productsService = new ProductsService
const usersService = new UserService

class ProductsController {
    getProducts = async (req = request, res) => {
        // const {limit, page = 1} = req.query
        try {
            let data = await productsService.getProductsWithOutPaginate()

            res.send(data)
        } catch (error) {
            req.logger.error(error)
        }
    }

    getProductById = async (req = request, res) => {
        const {pid} = req.params
        try {
            const allProducts = await productsService.getProducts()
            const productById = await productsService.getProductById(pid)

            pid ? res.send(productById) : res.send(allProducts)
        } catch (error) {
            req.logger.error(error)
        }
    }

    addProduct = async (req = request, res) => {
        const { title, description, code, price, stock, category, thumbnail, owner } = req.body

        try {
            let product = await productsService.addProduct({title, description, price, thumbnail, code, stock, category, owner})

            res.send(product)
        } catch (error) {
            req.logger.error(error)
        }
    }

    updateProduct = async (req = request, res) => {
        const {pid} = req.params
        const { title, description, code, price, stock, category, thumbnail, owner } = req.body

        let  obj =  { title, description, code, price, status: "true", stock, category, thumbnail, owner }
        try {
            await productsService.updateProduct(pid, obj)

            res.send({aviso: "producto actualizado"})
        } catch (error) {
            req.logger.error(error)
            res.send({aviso: "Error"})
        }
    }

    delete = async (req = request, res) => {
        const {pid} = req.params        // se recibe pid de los parametros
    
        try {
            const productById = await productsService.getProductById(pid)

            if (productById.owner == req.session.email || req.session?.admin == true) {
                await productsService.deleteProduct(pid)

                let user = await usersService.getUser(productById.owner)

                if (user.roll === 'premium') {

                    const transport = createTransport({
                        service: 'gmail',
                        port: 578,
                        auth: {
                            user: config.testMail,
                            pass: config.testMailPass
                        }
                    })

                    await transport.sendMail({
                        from:'Servicio de Node <javiermaita22@gmail.com>',
                        to: user.email,
                        subject: 'Su Producto fue eliminado',
                        html: `
                        <div>
                            <h1>Su producto ${productById.title} fue eliminado</h1>
                        </div>`
                    })
                }
                return res.send({aviso: "producto eliminado"})
            }

            res.send({error: "No tiene permisos"})
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductsController