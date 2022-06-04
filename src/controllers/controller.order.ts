import { Request, Response, NextFunction } from 'express';
import OrderService from '../service/service.order';

class OrderController {
    async getAllOrders(req: Request, res: Response, next: NextFunction) {
        return OrderService.getAllOrders(req, res)
    }

    async getOrder(req: Request, res: Response, next: NextFunction) {
        return OrderService.getOrder(req, res)
    }

    async createOrder(req: Request, res: Response, next: NextFunction) {
        return OrderService.createOrder(req, res)
    }

    async updateOrder(req: Request, res: Response, next: NextFunction) {
        return OrderService.updateOrder(req, res)
    }

    async deleteOrder(req: Request, res: Response, next: NextFunction) {
        return OrderService.deleteOrder(req, res)
    }
}

export default new OrderController();