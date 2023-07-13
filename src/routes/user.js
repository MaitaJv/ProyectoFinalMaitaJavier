import { Router } from "express";
import UserController from "../controllers/userController.js";
import { uploader } from "../ultis/multer.js";

const router = Router()
const userController = new UserController

router.get('/', userController.getusers)
router.get('/premium/:uemail', userController.rollSwitch)
router.get('/changePassword/:token', userController.renderChangePassword)
router.post('/:uemail/documents', uploader.single('file'), userController.uploadDocument)
router.post('/changePassword', userController.changePassword)

export default router