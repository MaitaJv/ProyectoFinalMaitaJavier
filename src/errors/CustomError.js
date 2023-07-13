export default class CustomError {
    static creacteError({name = 'Error', cause, message, code}){
        const error = new Error(message)
        error.cause = cause
        error.name = name
        error.code = code
        throw error.cause
    }
}