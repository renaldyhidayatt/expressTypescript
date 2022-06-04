import { Request, Response } from "express"

export interface DaoProduct{
    getAllProducts(req: Request, res: Response): Promise<any>
    getProduct(req: Request, res: Response): Promise<any>
    createProduct(req: Request, res: Response): Promise<any>
    updateProduct(req: Request, res: Response): Promise<any>
    deleteProduct(req: Request, res: Response): Promise<any>
}