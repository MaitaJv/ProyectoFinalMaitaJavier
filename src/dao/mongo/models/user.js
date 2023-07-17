import { Schema, model } from "mongoose";

const userCollection = 'users'

const userSchema = Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    roll:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    cart:{
        type: Schema.Types.ObjectId,
        ref: 'carts',
        require: true
    },
    password:{
        type: String
    },
    documents:{
        type: [{
            name:{
                type: String
            },
            reference:{
                type: String
            }
        }]
    },
    last_connection:{
        type: String
    }
})

userSchema.pre('find', function(){
    this.populate('cart')
})

export default model(userCollection, userSchema)