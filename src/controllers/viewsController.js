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
            console.log(req.session.email);
            const user = await userService.getUser(req.session)
            console.log(user);
            docs.forEach(product => {
                product.cart = user.cart
            });
            console.log("docs: ", docs);
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
            console.log(error)
        }
    }

    cartsRender = async (req = request, res) => {
        const {cid} = req.params
        const {limit = 1 , page = 1} = req.query
        console.log(limit)
        try {
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage} = await viewsService.getCartProducts(cid, limit, page)
            let data = docs[0].products
            console.log("data: ",data);
            let datos = {
                productos: data,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                page,
                limit
            }
            console.log("datos: ", datos);
            res.render('carts', datos)
        } catch (error) {
            console.log(error)
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
            console.log(saveUsers);
            let data = {
                usuarios: saveUsers
            }
            res.render('userMonitoring', data)
        } catch (error) {
            console.log(error)
        }
    }
}

export default ViewsController