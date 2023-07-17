import jwt from 'jsonwebtoken'
import { request } from "express"
import { createHash, isValidPassword } from "../ultis/bcrypt.js"
import { createTransport } from 'nodemailer'
import moment from 'moment'
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
            res.send({status: "ok", data: saveUsers})
        } catch (error) {
            req.logger.error(error)
        }
    }

    deleteUser = async (req = request, res) => {
        const {uemail} = req.params
        try {
            await userService.deleteUser(uemail)
            res.send({status: "ok"})
        } catch (error) {
            req.logger.error(error);
        }
    }

    deleteUsers = async (req = request, res) => {
        try {
            let users = await userService.getUsers()
            users.forEach(async user => {
                try {
                    req.logger.info("user.last_connection: ", user.last_connection, "TypeOf: ", typeof(user.last_connection))

                    let LC = user.last_connection.split(" ").join("")
                    let LC2 = moment(LC)
                    let now = moment().format("YYYY MM DD")
                    let now2 = moment(now.split(" ").join(""))

                    let dif = now2.diff(LC2, 'days')
                    req.logger.info(`LC: ${LC2}; now: ${now2}`)
                    req.logger.info('diferencia: ', dif)
                    req.logger.info('User.email: : ', user.email)
                    if (dif > 2) {
                        await userService.deleteUser(user.email)

                        const transport = createTransport({
                            service: 'gmail',
                            port: 578,
                            auth: {
                                user: config.testMail,
                                pass: config.testMailPass
                            }
                        })

                        let result = await transport.sendMail({
                            from:'Servicio de Node <javiermaita22@gmail.com>',
                            to: user.email,
                            subject: 'Su cuenta fue eliminada',
                            html: `
                            <div>
                                <h1>Su cuenta fue eliminada por inactividad</h1>
                            </div>`
                        })

                        req.logger.info(result)
                    }
                } catch (error) {
                    req.logger.error(error);
                }
            })
            res.send({status: "ok"})
        } catch (error) {
            req.logger.error(error)
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
            req.logger.debug(req.session.premium)
            res.send({status: 'ok', data: newUser})
            
        } catch (error) {
            req.logger.error(error)
        }
    }

    changeRoll = async (req = request, res) => {
        const {uemail} = req.params
        const {roll} = req.body

        try {
            let user = await userService.getUser(uemail)
            if (!user) res.send({status: 'error', message: 'El usuario no existe'})

            req.logger.info('roll: ', roll);
            let newuser = userService.updateRoll(uemail, roll) 

            res.send({status: "ok", data: newuser})
        } catch (error) {
            req.logger.error(error);
        }
    }

    changePassword = async (req = request, res) => {
        const { email, password } = req.body
        try {
            req.logger.debug('email: ', email)
            let user = await userService.getUser(email)
            req.logger.info('user: ', user)

            if(!user.password) {
                await userService.updateUser(email, createHash(password))
                return res.send({message: 'contraseña cambiada'})
            }
            
            if (isValidPassword(user, password)) return res.send('no puede colocar la contraseña anterior')
            await userService.updateUser(email, createHash(password))
            return res.send({message: 'contraseña cambiada'})
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
            req.logger.error(error)
        }
    }

    uploadDocument = async (req = request, res) => {
        const {name} = req.body
        const {uemail} = req.params
        try {
            if (!req.file) res.status(400).send({status: error, error: "No se pudo guardar la imagen"})
            
            let userData = await userService.getUser(uemail)
            req.logger.info('userData: ', userData)
            if (!userData.documents || userData.documents == []) {
                let user = await userService.uploadDocument(uemail, [{name, reference: req.file.path}])
                res.send({status: 'ok', link: req.file.path, user})
            }
            let documents = userData.documents
            documents.push({name, reference: req.file.path})
            req.logger.info('documents: ', documents)
            let user = await userService.uploadDocument(uemail, documents)
            res.send({status: 'ok', link: req.file.path, user})
        } catch (error) {
            req.logger.error(error)
        }
    }
}

export default UserController