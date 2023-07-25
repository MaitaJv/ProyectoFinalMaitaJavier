import { Schema, model } from "mongoose";

const ticketCollection = 'tickets'

const ticketSchema = new  Schema({
    purchase_datetime: {
        type:  String,
        required: true
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