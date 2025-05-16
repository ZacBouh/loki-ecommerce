import { RequestHandler } from "express"

const  authMiddleware : RequestHandler = (req, res, next) => {
    if(!req?.session?.user){
        res.status(401).json({err: 'You need to be connected to access this content'})
        return
    }
    next()
}

export  default authMiddleware