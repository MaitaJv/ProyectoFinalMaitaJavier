import { Router } from "express"
import { vali } from "../middleware/validation.js"
import { rollAdminVerify, importanRollVerify } from "../middleware/rollVerify.js"
import ProductsController from "../controllers/productsController.js"

const router = Router()

const productsController = new ProductsController

router.get('/', productsController.getProducts)

router.get('/:pid', productsController.getProductById)

router.post('/', importanRollVerify, vali, productsController.addProduct)

router.put('/:pid', importanRollVerify, vali, productsController.updateProduct)

router.delete('/:pid', importanRollVerify, productsController.delete)

export default router