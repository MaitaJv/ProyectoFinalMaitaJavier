import { Router } from "express";
import UserController from "../controllers/userController.js";
import { uploader } from "../ultis/multer.js";

const router = Router()
const userController = new UserController

router.get('/', userController.getusers)
router.delete('/', userController.deleteUsers)
router.post('/:uemail', userController.deleteUser)
router.get('/premium/:uemail', userController.rollSwitch)
router.get('/changePassword/:token', userController.renderChangePassword)
router.post('/changeRoll/:uemail', userController.changeRoll)
router.post('/changeUser/Password', userController.changePassword)
router.post('/:uemail/documents', uploader.single('file'), userController.uploadDocument)

export default router