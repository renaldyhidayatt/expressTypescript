import { Request, Response, NextFunction } from 'express'
import serviceAuth from '../service/service.user';

class AuthController {
    async signUp(req: Request, res: Response, next: NextFunction) {
        return serviceAuth.registerService(req, res)

    }
    async signIn(req: Request, res: Response, next: NextFunction) {
        return serviceAuth.loginService(req, res)
    }
}


export default new AuthController();