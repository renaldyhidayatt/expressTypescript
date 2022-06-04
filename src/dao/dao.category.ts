import { Request, Response} from 'express'

export interface DaoCategory {
    getAllCategories(req: Request, res: Response): Promise<any>
    getCategory(req: Request, res: Response): Promise<any>
    createCategory(req: Request, res: Response): Promise<any>
    updateCategory(req: Request, res: Response): Promise<any>
    deleteCategory(req: Request, res: Response): Promise<any>
}