import { request } from "express";
import ViewsService from "../services/viewsService.js";
import UserService from "../services/userService.js";

const viewsService = new ViewsService
const userService = new UserService

class ViewsController {
    productsRender = async (req = request, res) => {
        const {limit = 1 , page = 1, query} = req.query
        let filtro = {}
        query? filtro = {category: query} : filtro = {}
        try {
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage} = await viewsService.getProducts(limit, page, filtro)
            req.logger.debug(req.session.email)
            const user = await userService.getUser(req.session)
            req.logger.info(user);
            docs.forEach(product => {
                product.cart = user.cart
            })
            req.logger.info('docs: ', docs)
            let datos = {
                productos: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                page,
                limit,
                query,
                cart: user.cart,
                username: req.session.user
            }
            res.render('home', datos)
        } catch (error) {
            req.logger.error(error)
        }
    }

    cartsRender = async (req = request, res) => {
        const {cid} = req.params
        const {limit = 1 , page = 1} = req.query
        try {
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage} = await viewsService.getCartProducts(cid, limit, page)
            let data = docs[0].products
            req.logger.info("data: ",data);
            let datos = {
                productos: data,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                page,
                limit
            }
            req.logger.info("datos: ", datos);
            res.render('carts', datos)
        } catch (error) {
            req.logger.error(error)
        }
    }

    realTimeProductsRender = (req = request, res) => {
        res.render('realTimeProducts')
    }

    chat = (req = request, res) => {
        res.render('chat')
    }

    userMonitoring = async (req = request, res) => {
        try {
            let users = await userService.getUsers()
            let saveUsers = []
            users.forEach(user => {
                saveUsers.push({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    roll: user.roll
                })
            });
            req.logger.info(saveUsers);
            let data = {
                usuarios: saveUsers
            }
            res.render('userMonitoring', data)
        } catch (error) {
            req.logger.error(error)
        }
    }
}

export default ViewsController