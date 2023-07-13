import { Router } from "express";
import PaymentController from "../controllers/paymentController.js";

const router = Router()
const paymentController = new PaymentController

router.post('/payment-intents', paymentController.paymentIntent)

export default router