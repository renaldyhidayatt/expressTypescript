import { Response, Request, NextFunction } from 'express';
import serviceCategory from '../service/service.category';

class CategoryController {
    async getAllCategories(req: Request, res: Response, next: NextFunction) {
        const categories = serviceCategory.getAllCategories();
        if (!categories) {
            return res.status(400).send({
                message: "No categories found"
            });
        }
        res.json(categories);
    }

    async getCategory(req: Request, res: Response, next: NextFunction) {
        const category = serviceCategory.getCategory(req.params.id);
        if (!category) {
            return res.status(400).send({
                message: "Category not found"
            });
        }
        res.json(category);
    }

    async createCategory(req: Request, res: Response, next: NextFunction) {
        const category = serviceCategory.createCategory(req.body);

        if (!category) {
            return res.status(400).send({
                message: "Category not created"
            });
        }

        return res.send(category);
    }

    async updateCategory(req: Request, res: Response, next: NextFunction) {
        const category = serviceCategory.updateCategory(req.params.id, req.body);

        if (!category) {
            return res.status(400).send({
                message: "Category not found"
            });
        }

        return res.send(category);
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction) {
        const category = serviceCategory.deleteCategory(req.params.id);

        if (!category) {
            return res.status(400).send({
                message: "Category not found"
            });
        }

        return res.send(category);
    }
}

export default new CategoryController();