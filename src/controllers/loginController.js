import { request } from "express";
import config  from '../config/env.js'
import UserService from "../services/userService.js";
import moment from 'moment';

const userService = new UserService
class LoginController {
    loginRender = (req = request, res)=>{
        res.render('login')
    }

    registerRender = (req = request, res)=>{
        res.render('register')
    }

    failLoginRender = (req = request, res)=>{
        res.send({status: 'error', message: 'fallo el login'})
    }

    failRegisterRender = (req = request, res)=>{
        res.send({status: 'error', message: 'fallo el registro'})
    }

    loginVoid = async (req = request, res)=>{
        const { username, password } = req.body

        try {
            
            if (username !== config.adminName || password !== config.adminPassword) {
                let user = await userService.getUser(username)
                req.session.user = username
                req.session.email = username
                if (user.roll == 'admin') {
                    req.session.admin = true
                    req.session.premium = false
                    req.session.usuario = false
                }
                if (user.roll == 'premium') {
                    req.session.admin = false
                    req.session.premium = true
                    req.session.usuario = false
                }
                if (user.roll == 'user') {
                    req.session.admin = false
                    req.session.premium = false
                    req.session.usuario = true
                }
                let last_connection = moment().format("YYYY MM DD");
                req.logger.info("last_connection: ", last_connection);
                await userService.updateLastConnection(username, last_connection.toString())
                res.redirect('http://localhost:8080/products')
            } else {
                req.session.user = username
                req.session.email = username
                req.session.admin = true
                req.session.premium = false
                req.session.usuario = false
                req.logger.warning('usted es admin')
                let last_connection = moment().format("YYYY MM DD");
                req.logger.info("last_connection: ", last_connection);
                await userService.updateLastConnection(username, last_connection.toString())
                res.redirect('http://localhost:8080/products')
            }
        } catch (error) {
            console.log(error)
        }
    }

    registerVoid = (req = request, res)=>{
        try {
            res.redirect('http://localhost:8080/auth/login')
        } catch (error) {
            req.logger.error(error)
        }
    }

    logoutVoid = (req = request, res)=>{
        try {
            req.session.destroy(err => {
                if(!err) res.redirect('http://localhost:8080/auth/login')
                else res.send({status:'Logout error', message: err})
            })
        } catch (error) {
            req.logger.error(error)
        }
    }

    githubcallback = async (req = request, res)=>{
        try {
            req.logger.info(req.user)
            req.session.user = req.user.first_name
            req.session.email = req.user.email
            req.session.admin = false
            req.session.premium = false
            req.session.usuario = true
            let last_connection = moment().format("YYYY MM DD");
            req.logger.info(`last_connection: ${last_connection}`);
            await userService.updateLastConnection(req.user.email, last_connection.toString())
            res.redirect('http://localhost:8080/products')
        } catch (error) {
            req.logger.error(error)
        }
    }
}

export default LoginController