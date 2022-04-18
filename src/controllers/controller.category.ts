import { Response, Request, NextFunction } from 'express';
import Category from '../models/model.category';

class CategoryController {
    async getAllCategories(req: Request, res: Response, next: NextFunction) {
        const categories = await Category.find();
        if (!categories) {
            return res.status(400).send({
                message: "No categories found"
            });
        }
        res.json(categories);
    }

    async getCategory(req: Request, res: Response, next: NextFunction) {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(400).send({
                message: "Category not found"
            });
        }
        res.json(category);
    }

    async createCategory(req: Request, res: Response, next: NextFunction) {
        let category = new Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        })

        category = await category.save();

        if (!category) {
            return res.status(400).send({
                message: "Category not created"
            });
        }

        return res.send(category);
    }

    async updateCategory(req: Request, res: Response, next: NextFunction) {
        const category = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        })

        if (!category) {
            return res.status(400).send({
                message: "Category not found"
            });
        }

        return res.send(category);
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction) {
        const category = await Category.findByIdAndRemove(req.params.id);

        if (!category) {
            return res.status(400).send({
                message: "Category not found"
            });
        }

        return res.send(category);
    }
}

export default new CategoryController();