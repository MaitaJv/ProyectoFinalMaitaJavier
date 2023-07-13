export function rollAdminVerify(req, res, next) {
    if (req.session?.admin) return next()
    return res.status(401).send('Usted no tiene permisos')
}

export function rollPremiumVerify(req, res, next) {
    if (req.session?.premium) return res.status(401).send('Usted no puede adquirir su propio producto')
    return next()
}

export function rollUserVerify(req, res, next) {
    if (req.session?.usuario) {
        return next()
    }
    return res.status(401).send('Usted no es usuario')
}

export function rollDeleteVerify(req, res, next) {
    if (req.session?.admin) return next()
    if (req.session?.premium) return next()
    return res.status(401).send('Usted no tiene permisos')
}