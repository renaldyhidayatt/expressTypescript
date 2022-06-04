import { DaoCategory} from "../dao/dao.category"
import Category from "../models/model.category"
import {Request, Response} from "express"
import {ICategory} from "../interface/ICategory"

class CategoryService implements DaoCategory {
    async getAllCategories(req: Request, res: Response): Promise<any> {
        const categories = Category.find();
        if (!categories) {
            return res.status(400).send({
                message: "No categories found"
            });
        }
        res.json(categories);
    }

    async getCategory(req: Request, res: Response): Promise<any> {
        const category = Category.findById(req.params.id);
        if (!category) {
            return res.status(400).send({
                message: "Category not found"
            });
        }
        res.json(category);
    }

    async createCategory(req: Request, res: Response): Promise<any> {
        const {name, icon, color}: ICategory = req.body
        const category = Category.create({
            name,
            icon,
            color
        });
        if (!category) {
            return res.status(400).send({
                message: "Category not created"
            });
        }

        return res.send(category);
    }

    async updateCategory(req: Request, res: Response): Promise<any> {
        const {name, icon, color}: ICategory = req.body

        const category = Category.findByIdAndUpdate(req.params.id, {
            name,
            icon,
            color
        });

        if (!category) {
            return res.status(400).send({
                message: "Category not found"
            });
        }

        return res.send(category);
    }

    async deleteCategory(req: Request, res: Response): Promise<any> {
        const category = Category.findById(req.params.id);

        if (!category) {
            return res.status(400).send({
                message: "Category not found"
            });
        }

        return res.send(category);
    }
}

export default new CategoryService();