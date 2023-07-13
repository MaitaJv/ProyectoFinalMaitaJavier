import jwt from 'jsonwebtoken'
import { request } from "express"
import { createHash, isValidPassword } from "../ultis/bcrypt.js"
import UserService from "../services/userService.js"
import config from '../config/env.js';

const userService = new UserService

class UserController{

    getusers = async (req = request, res) => {
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
            // console.log(saveUsers)
            res.send({status: "ok", data: saveUsers})
        } catch (error) {
            console.log(error)
        }
    }

    rollSwitch = async (req = request, res) => {
        const {uemail} = req.params
        try {
            let user = await userService.getUser(uemail)
            if (!user) res.send({status: 'error', message: 'El usuario no existe'})

            req.session.premium = !req.session.premium

            if (!req.session.premium) {
                let user = await userService.getUser(uemail)
                let iden = user.documents.find(document => document.name == 'Identificacion')
                let compDom = user.documents.find(document => document.name == 'Comprobante de domicilio')
                let compEsta = user.documents.find(document => document.name == 'Comprobante de estado de cuenta')
                if (!iden || !compDom || !compEsta) res.send({status: 'error', message: 'no cuenta con toda la documentacion subida'})
            }
            let newUser = await userService.updateRoll(uemail, `${req.session.premium ? 'premium' : 'user'}`)
            console.log(req.session.premium)
            res.send({status: 'ok', data: newUser})
            
        } catch (error) {
            console.log(error)
        }
    }

    changePassword = async (req = request, res) => {
        const { email, password } = req.body

        try {
            console.log('email: ', email)
            let user = await userService.getUser(email)

            console.log('user: ', user)
            if (isValidPassword(user, password)) res.send('no puede colocar la contraseña anterior')
            console.log('logre pasar')
            await userService.updateUser(email, createHash(password))
            res.send({message: 'contraseña cambiada'})
        } catch (error) {
            console.log(error)
        }
    }

    renderChangePassword = async (req = request, res) => {
        const {token} = req.params
        try {
            jwt.verify(token, config.privateKey, (error)=>{
                if(error){
                    res.redirect('http://localhost:8080/api/mail')
                }
                res.render('changePassword')
            })
        } catch (error) {
            console.log(error)
        }
    }

    uploadDocument = async (req = request, res) => {
        const {name} = req.body
        const {uemail} = req.params
        try {
            if (!req.file) res.status(400).send({status: error, error: "No se pudo guardar la imagen"})
            
            let userData = await userService.getUser(uemail)
            console.log('userData: ', userData)
            if (!userData.documents || userData.documents == []) {
                let user = await userService.uploadDocument(uemail, [{name, reference: req.file.path}])
                res.send({status: 'ok', link: req.file.path, user})
            }
            let documents = userData.documents
            documents.push({name, reference: req.file.path})
            console.log('documents: ', documents)
            let user = await userService.uploadDocument(uemail, documents)
            res.send({status: 'ok', link: req.file.path, user})
        } catch (error) {
            console.log(error)
        }
    }
}

export default UserController