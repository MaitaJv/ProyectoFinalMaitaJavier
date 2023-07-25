import cartsModel from "./models/carts.js"

export class MongoCartManager {

    async createCart(){
        try {
            let cart = await cartsModel.create({products: []})
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async uploadProduct(cid, pid){
        try {
            let carrito = await cartsModel.findOne({_id: cid})
            
            let product = carrito.products.find(product => product.pid == pid)
    
            if (product !== undefined) {
                await cartsModel.updateOne(
                    {
                        _id: cid
                    },
                    {
                        $set:
                        {
                            'products.$[pid]': {'pid': pid, 'quantity': product.quantity + 1}
                        }
                    },
                    {
                        arrayFilters: 
                        [
                            {'pid.pid': pid}
                        ]
                    }
                )
                return await cartsModel.find({_id: cid})
            }
    
            if (product == undefined) {
                await cartsModel.findByIdAndUpdate(cid, {$push: {'products': {pid: pid, quantity : 1}}})
                return await cartsModel.find({_id: cid})
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getAllCartProducts(cid){
        try {
            const cartProducts = await cartsModel.find({_id: cid})
            return cartProducts
        } catch (error) {
            console.log(error)
        }
    }

    async getCartProducts(cid, limit, page){
        try {
            const cartProducts = await cartsModel.paginate({_id: cid}, {limit: limit, page: page, lean: true})
            return cartProducts
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(cid, pid){
        try {
            console.log(`cid: ${cid}, pid: ${pid}`)
            let carrito = await cartsModel.findOne({_id: cid})
    
            let products = carrito.products.filter(product => product.pid != pid)

            console.log('carrito: ', carrito)
            console.log('products: ', products)

            await cartsModel.updateOne(
                {
                    _id: cid
                },
                {
                    $set:
                    {
                        'products': products
                    }
                }
            )

            return await cartsModel.find({_id: cid})
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCartProducts(cid){
        try {
            let products = []

            await cartsModel.updateOne(
                {
                    _id: cid
                },
                {
                    $set:
                    {
                        'products': products
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async arrayProductsUpdate(cid, data){
        try {
            await cartsModel.updateOne(
                {
                    _id: cid
                },
                {
                    $set:
                    {
                        'products': data
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
}