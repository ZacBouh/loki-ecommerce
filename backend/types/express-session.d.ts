import 'express-session'
import type { UserType } from '../models/user.ts'
declare module 'express-session' {
    interface SessionData {
        user : UserType
    }
}