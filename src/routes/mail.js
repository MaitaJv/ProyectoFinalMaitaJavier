import { Router } from "express";
import { MailController } from "../controllers/mailController.js";

const router = new Router()
const mailController = new MailController

router.get('/', mailController.mailRender)
router.post('/', mailController.sendMail)

export default router