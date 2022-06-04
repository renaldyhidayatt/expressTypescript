import { Request, Response, NextFunction } from 'express'
import serviceAuth from "../service/service.user";


class UserController {
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        return serviceAuth.findAll(req, res)
    }

    async getUser(req: Request, res: Response, next: NextFunction) {
        return serviceAuth.findByid(req, res)
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        return serviceAuth.updateId(req, res)
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        return serviceAuth.deleteUser(req, res)
    }
}
export default new UserController();