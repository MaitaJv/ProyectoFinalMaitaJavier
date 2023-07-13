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
            // console.log(cid)
            // console.log(carrito)
            // console.log(product)
    
            if (product !== undefined) {
                return await cartsModel.updateOne(
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
            }
    
            if (product == undefined) {
                return await cartsModel.findByIdAndUpdate(cid, {$push: {'products': {pid: pid, quantity : 1}}})
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getCartProducts(cid, limit, page){
        try {
            const cartProducts = await cartsModel.paginate({_id: cid}, {limit: limit, page: page, lean: true})
            // console.log(cartProducts)
            return cartProducts
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(cid, pid){
        try {
            let carrito = await cartsModel.findOne({cid: cid})
    
            let products = carrito.products.filter(product => product.pid != pid)

            console.log(products)

            // await cartsModel.findByIdAndUpdate(cid, products)

            return await cartsModel.updateOne(
                {
                    cid: cid
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