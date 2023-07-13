
import CustomError from "../errors/CustomError.js"
import EErrors from "../errors/enum.js"
import { generateProductErrorInfo } from "../errors/info.js"

export function vali (req, res, next){
    const { title, description, code, price, status, stock, category, thumbnail } = req.body
    console.log(req.body)
    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {

        CustomError.creacteError({
            name: 'product creation error',
            cause: generateProductErrorInfo({ title, description, code, price, status, stock, category, thumbnail }),
            message: 'Error trying to create a new product',
            code: EErrors.INVALID_PROPERTIES
        })

        return res.status(401).send('datos invalidos')
    }
    return next()
}