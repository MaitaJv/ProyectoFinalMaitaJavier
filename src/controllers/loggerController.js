import { request } from "express";

class LoggerController{
    loggerTest = async (req = request, res) => {
        req.logger.debug('Esto es un Log de nivel debug')
        req.logger.http('Esto es un Log de nivel http')
        req.logger.info('Esto es un Log de nivel Info')
        req.logger.warning('Esto es un Log de nivel warning')
        req.logger.error('Esto es un Log de nivel error')
        req.logger.fatal('Esto es un Log de nivel fatal')

        res.send('Prueba Logger')
    }
}

export default LoggerController