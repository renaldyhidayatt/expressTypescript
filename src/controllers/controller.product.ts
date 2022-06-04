import { Request, Response, NextFunction } from 'express'
import serviceProduct from '../service/service.product';


class ProductController {
    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        return serviceProduct.getAllProducts(req, res)
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        return serviceProduct.getProduct(req, res)
    }

    async createProduct(req: Request, res: Response, next: NextFunction) {
        return serviceProduct.createProduct(req, res)
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        return serviceProduct.updateProduct(req, res)
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        return serviceProduct.deleteProduct(req, res)
    }
}

export default new ProductController();