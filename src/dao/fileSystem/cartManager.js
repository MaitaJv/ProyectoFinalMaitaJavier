import fs from 'fs'

export class CartManager {
    #ruta = './src/carts.json'
    constructor(){
        this.path = this.#ruta
    }

    async createCart(){
        let cart = {}
        
        if(fs.existsSync(this.path)){     //si el archivo existe se pushea el carrito
            let data = await fs.promises.readFile(this.path, 'utf-8') //data en JSON
            let dataJS = JSON.parse(data)                             //data en JS

            cart.id = dataJS[dataJS.length - 1].id + 1             //agrego id
            cart.products = []
            dataJS.push(cart)

            await fs.promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')        //se escribe en el archivo los carritos en JSON

        }else{                           //si el archivo NO existe se crea uno
            cart.id = 1
            cart.products = []
            const arrC = [cart]

            await fs.promises.writeFile(this.path, `${JSON.stringify(arrC, null, 2)}`, 'utf-8')   //se crea el archivo con el carrito en JSON
        }
    }

    async uploadProduct(cid, pid){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')           // se lee el archivo y se guarda en data para despues parsearla
            let dataJS = JSON.parse(data)
            let carrito = dataJS[cid - 1]                                       
            let idx = carrito.products.findIndex(product => product.id == pid)  // se busca el index de del producto que se quiere agregar

            if(idx !== -1){                                                     // si existe, quantity++
                let product = carrito.products[idx]

                product.quantity++
                carrito.products[idx] = product
            }else{                                                              // si no existe se agregar un obj con el id y quantity = 1
                let product = {}
                product.id = pid
                product.quantity = 1
                carrito.products = [...carrito.products, product]
            }

            dataJS[cid - 1] = carrito

            await fs.promises.writeFile(this.path, JSON.stringify(dataJS, null, 2), 'utf-8')        // se actualiza el archivo

        } catch (error) {
            console.log(error)
        }
    }

    async getCartProducts(cid){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')           // se lee el archivo y se guarda en data para despues parsearla
            let dataJS = JSON.parse(data)
            let carrito = dataJS[cid -1]

            return carrito.products             // se retornan los productos
        } catch (error) {
            console.log(error)
        }
    }
}