import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import session from 'express-session'
import passport from 'passport'

import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js'
import viewsRouter from './routes/views.js'
import loginRouter from './routes/login.js'
import sessionsRouter from './routes/sessions.js'
import mockingRouter from './routes/mocking.js'
import loggerRouter from './routes/logger.js'
import usersRouter from './routes/user.js'
import mailRouter from './routes/mail.js'
import paymentRouter from './routes/payment.js'

import __dirname from './utils.js'
import { ProductManager } from './dao/fileSystem/productManager.js'
import ProductsService from './services/productsService.js'
import dbConnection from './config/dbConnection.js'
import chatModel from "./dao/mongo/models/chat.js"
import { initPassport } from './config/passport.js'
import errorMid from './middleware/errorMid.js'
import { addLogger } from './ultis/logger.js'

import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

const app = express()
const PORT = 8080

dbConnection()

const productManager = new ProductManager
const productsService = new ProductsService

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret: 'secretCoder',
    resave: false,
    saveUninitialized: false
}))

initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(errorMid)
app.use(addLogger)

app.use('/public' ,express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de Proyecto CoderHouse Comision-32270',
            description: 'Proyecto desarrollado por Javier Maita'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsDoc(swaggerOptions)

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use('/', viewsRouter)
app.use('/auth', loginRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/users', usersRouter)
app.use('/api/mail', mailRouter)
app.use('/api/payment', paymentRouter)

app.use('/mockingproducts', mockingRouter)
app.use('/loggerTest', loggerRouter)

const httpServer = app.listen(PORT, (err)=>{
    if (err) console.log(err)
    console.log('Escuchando puerto: ', PORT);
})

httpServer.on

const socketServer = new Server(httpServer)

let productos
let mensajes

socketServer.on('connection', async socket => {
    console.log('Nuevo cliente conectado')
    try {
        productos = await productsService.getProductsWithOutPaginate()
        console.log(productos);
        mensajes = await chatModel.find()
        socket.emit('mensajeServer', productos)
        socket.emit('mensajesChat', mensajes)
    } catch (error) {
        console.log(error)
    }

    socket.on('product', async data => {
        console.log('data: ', data)

        const   {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnail,
            owner
        } = data

        if (!title || !description || !code || !price || !stock || !category || !owner) {
            console.log('datos invalidos')
        }else{
            try {
                await productsService.addProduct({title, description, price, thumbnail, code, stock, category, owner})
                let datos = await productsService.getProductsWithOutPaginate()
                socketServer.emit('productoAgregado', datos)
            } catch (error) {
                console.log(error)
            }
        }
    })

    socket.on('deleteProduct', async data => {
        try {
            await productsService.deleteProduct(data)
            let datos = await productsService.getProductsWithOutPaginate()
            socketServer.emit('prodcutoEliminado', datos)
        } catch (error) {
            console.log(error)
        }
    })

    socket.on('msg', async data => {
        console.log(data);
        try {
            await chatModel.insertMany(data)
            let datos = await chatModel.find()
            socketServer.emit('newMsg', datos)
        } catch (error) {
            console.log(error)
        }
    })
})