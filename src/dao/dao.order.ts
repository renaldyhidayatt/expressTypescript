import {Request, Response} from "express"

export interface DaoOrder{
    getAllOrders(req: Request, res: Response): Promise<any>
    getOrder(req: Request, res: Response): Promise<any>
    createOrder(req: Request, res: Response): Promise<any>
    updateOrder(req: Request, res: Response): Promise<any>
    deleteOrder(req: Request, res: Response): Promise<any>
}