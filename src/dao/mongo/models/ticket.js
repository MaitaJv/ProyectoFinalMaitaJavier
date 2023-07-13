import { Schema, model } from "mongoose";

const ticketCollection = 'tickets'

const ticketSchema = new  Schema({
    code: {
        type: Number,
        default: 5
    },
    purchase_datetime: {
        type:  String
    },
    amount:{
        type: Number,
        required: true
    },
    purchaser:{
        type: String,
        require: true
    }
})

export default model(ticketCollection, ticketSchema)