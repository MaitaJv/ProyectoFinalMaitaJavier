import fs from 'fs'

export class ProductManager {
    #ruta = './src/products.json'
    constructor(){
        this.path = this.#ruta
    }

    async addProduct(title, description, price, thumbnail, code, stock, status, category){
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        }

        try {

            if(fs.existsSync(this.path)){     //si el archivo existe se pushea el producto
                console.log("existe el archivo");
                let data = await fs.promises.readFile(this.path, 'utf-8') //data en JSON
                let dataJS = JSON.parse(data)                             //data en JS
    
                product.id = dataJS[dataJS.length - 1].id + 1             //agrego id
                dataJS.push(product)
    
                await fs.promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')        //se escribe en el archivo los productos en JSON
    
            }else{                           //si el archivo NO existe se crea uno
                product.id = 1
                const arrProducts = [product]
    
                await fs.promises.writeFile(this.path, `${JSON.stringify(arrProducts, null, 2)}`, 'utf-8')   //se crea el archivo con el producto en JSON
            }

        } catch (error) {
            console.log(error)
        }
    }

    async getProducts(){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')           // se lee el archivo y se guarda en data para despues parsearla
            let dataJS = JSON.parse(data)

            return dataJS                       // se retronan toda la data en JS
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')           // se lee el archivo y se guarda en data para despues parsearla
            let dataJS = JSON.parse(data)

            const productById = dataJS.find(product => product.id == id)        // se guarda en productoById el producto que compar su id con el solicitado
            
            return productById                  // se retorna el producto que se solicito
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, obj){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')           // se lee el archivo y se guarda en data para despues parsearla
            let dataJS = JSON.parse(data)

            let productById = dataJS.find(product => product.id == id)          // se guarda en productoById el producto que compar su id con el solicitado

            productById = obj
            productById.id = id                                                 // se modifica el valor del producto

            dataJS.splice((id - 1), 1, productById)                             // se elimina el producto antigüo y se sube el actualizado


            await fs.promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')       // se escribe en el archivo la actualización
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')           // se lee el archivo y se guarda en data para despues parsearla
            let dataJS = JSON.parse(data)

            dataJS.splice((id - 1), 1)          // se eliminar el producto

            let contador = 1

            dataJS.forEach(product => {         // corregimos el hueco en los id
                product.id = contador++
            })

            await fs.promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')       // se escribe en el archivo la actualización
        } catch (error) {
            console.log(error)
        }
    }
}