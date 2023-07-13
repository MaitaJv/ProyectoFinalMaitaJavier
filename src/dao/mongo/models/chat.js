import { Schema, model } from "mongoose";

const chatCollection = 'messages'

const chatModel = Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

export default model(chatCollection, chatModel)