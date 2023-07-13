import { Router } from "express"
import { MongoCartManager } from "../dao/mongo/MongoCartManager.js"
import CartsController from "../controllers/cartsController.js"
import { rollPremiumVerify, rollUserVerify } from "../middleware/rollVerify.js"
import productIdVali from "../middleware/productIdValidation.js"

const router = Router()

const cartsController = new CartsController

router.post('/', cartsController.createCart)

router.get('/:cid', cartsController.getCartProducts)

// router.post('/:cid/product/:pid', productIdVali, rollPremiumVerify, rollUserVerify, cartsController.newProduct)
router.post('/:cid/product/:pid', productIdVali, cartsController.newProduct)

// router.delete('/:cid/product/:pid', rollUserVerify, cartsController.deleteProduct)
router.delete('/:cid/product/:pid', cartsController.deleteProduct)

router.put('/:cid/product/:pid', cartsController.uploadProduct)

router.delete('/:cid', cartsController.deleteCartProducts)

router.put('/:cid', cartsController.arrayProductsUpdate)

router.get('/:cid/purchase', cartsController.createTicket)

export default router