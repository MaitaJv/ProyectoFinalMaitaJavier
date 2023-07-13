import winston from 'winston'

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
}

const logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({level: 'debug'}),
        new winston.transports.File({filename: './logs/errors.log', level: 'info'})
    ]
})

export function addLogger(req, res, next){
    req.logger = logger
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}