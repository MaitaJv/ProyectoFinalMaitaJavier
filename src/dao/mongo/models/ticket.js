import { Schema, model } from "mongoose";

const ticketCollection = 'tickets'

const ticketSchema = new  Schema({
    purchase_datetime: {
        type:  String,
        required: true,
        unique: false
    },
    amount:{
        type: Number,
        required: true,
        unique: false
    },
    purchaser:{
        type: String,
        require: true,
        unique: false
    }
})

export default model(ticketCollection, ticketSchema)