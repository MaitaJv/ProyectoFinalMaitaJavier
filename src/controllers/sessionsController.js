import { request } from "express"
import UserService from "../services/userService.js"

const userService = new UserService

class SessionsController {
    current = async (req = request, res) => {
        try {
            let email = req.session.email
            let user = await userService.getUser(email)
            req.logger.info(user)
            res.send(user)
        } catch (error) {
            req.logger.error(error)
        }
    }
}

export default SessionsController