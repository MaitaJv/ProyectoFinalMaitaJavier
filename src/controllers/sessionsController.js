import { request } from "express"
import UserService from "../services/userService.js"

const userService = new UserService

class SessionsController {
    current = async (req = request, res) => {
        try {
            let email = req.session.email
            let user = await userService.getUser(email)
            console.log(user)
            res.send(user)
        } catch (error) {
            console.log(error)
        }
    }
}

export default SessionsController