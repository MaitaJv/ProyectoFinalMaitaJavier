import multer from 'multer'
import __dirname from '../utils.js'

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const {path} = req.body
        if (path == 'profiles') cb(null,__dirname+'/files/profiles')
        if (path == 'products') cb(null,__dirname+'/files/products')
        if (path == 'documents') cb(null,__dirname+'/files/documents')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

export const uploader = multer({storage})