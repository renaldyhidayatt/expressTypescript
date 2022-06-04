import {Request, Response} from "express"

export interface DaoUsers {
    registerService(req: Request, res: Response): Promise<any>
    loginService(req: Request, res: Response): Promise<any>
    findByEmail(req: Request, res: Response): Promise<any>
    findAll(req: Request, res: Response): Promise<any>
    updateId(req: Request, res: Response): Promise<any>
    findByid(req: Request, res: Response): Promise<any>
    deleteUser(req: Request, res: Response): Promise<any>
}