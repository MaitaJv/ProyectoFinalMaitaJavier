import { connect } from "mongoose"
import config from "./env.js"

const URL = config.mongoUrl
const dbConnection = async () => {
    return await connect(URL, err => {
        if (err) {
            console.log('No se puede conectar mongodb: ', err)
            process.exit()
        }
        console.log('DB conectada ')
    })
}

export default dbConnection