import passport from "passport"
import { Router } from "express"
import { userVali } from "../middleware/userValidation.js"
import LoginController from "../controllers/loginController.js"

const router = Router()

const loginController = new LoginController

// Client ID: Iv1.b6ac1a5f856717dc
// Secrect Client : de3844f079b2117ee877294638dd6e0d6d5ef1b2

router.get('/login', loginController.loginRender)

router.get('/register', loginController.registerRender)

router.post('/login', passport.authenticate('login', {failureRedirect: '/auth/faillogin'}), loginController.loginVoid)

router.get('/faillogin', loginController.failLoginRender)

router.post('/register', userVali, passport.authenticate('register', {failureRedirect: '/auth/failregister'}), loginController.registerVoid)

router.get('/failregister', loginController.failRegisterRender)

router.post('/logout', loginController.logoutVoid)

router.get('/github', passport.authenticate('github',{scope: ['user:email']}))

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), loginController.githubcallback)



export default router