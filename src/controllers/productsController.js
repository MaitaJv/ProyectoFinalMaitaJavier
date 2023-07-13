import { request } from "express"
import ProductsService from "../services/productsService.js"

const productsService = new ProductsService

class ProductsController {
    getProducts = async (req = request, res) => {
        const {limit, page = 1} = req.query
        try {
            let data = await productsService.getProducts(limit)

            res.send(data.docs)
        } catch (error) {
            console.log(error)
        }
    }

    getProductById = async (req = request, res) => {
        const {pid} = req.params
        try {
            const allProducts = await productsService.getProducts()
            const productById = await productsService.getProductById(pid)

            pid ? res.send(productById) : res.send(allProducts)
        } catch (error) {
            console.log(error)
        }
    }

    addProduct = async (req = request, res) => {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body

        try {
            let product = await productsService.addProduct({title, description, price, thumbnail, code, stock, status, category})

            res.send(product)
        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async (req = request, res) => {
        const {pid} = req.params
        const { title, description, code, price, status, stock, category, thumbnail } = req.body

        let  obj =  { title, description, code, price, status, stock, category, thumbnail }
        try {
            await productsService.updateProduct(pid, obj)

            res.send({aviso: "producto actualizado"})
        } catch (error) {
            console.log(error)
            res.send({aviso: "Error"})
        }
    }

    delete = async (req = request, res) => {
        const {pid} = req.params        // se recibe pid de los parametros
    
        try {
            const productById = await productsService.getProductById(pid)

            if (productById.owner == req.session.email || req.session?.admin) {
                await productsService.deleteProduct(pid)
                res.send({aviso: "producto eliminado"})
            }

            res.send({error: "No tiene permisos"})
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductsController