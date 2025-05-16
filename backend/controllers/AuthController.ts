import { RequestHandler } from 'express'
import { User } from '../models/user.js'
import bcrypt from 'bcrypt'

export default class AuthController {

    static loginUser : RequestHandler<{}, any, {email: string, password: string} > = async (req, res) => {
        const {email, password} = req.body
        if (!email || !password) {
            res.status(400).json({error: "Login requires email and password"})
            return
        }
        const user = await User.findOne({email : email}).exec()
        if (!user) {
            res.status(400).json({error: "User not found"})
            return
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword){
            res.status(401).json({error: "Invalid password"})
            return
        } 
        res.status(200).json({
            user : {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
        return 
    }
}