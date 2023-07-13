export function userVali (req, res, next){
    const { first_name, last_name, age, roll = 'user', email, password } = req.body
    
    if (!first_name || !last_name || !age || !roll || !email || !password) {
        return res.status(401).send('datos invalidos')
    }
    return next()
}