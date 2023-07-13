import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const cartCollection = 'carts'

const cartSchema = Schema({
    products: {
        type: [{
            pid: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number,
            }
        }]
    }
})

cartSchema.pre('find', function(){
    this.populate('products.pid')
})

cartSchema.plugin(mongoosePaginate)

export default model(cartCollection, cartSchema)