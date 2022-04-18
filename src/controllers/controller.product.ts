import { Request, Response, NextFunction } from 'express'
import Product from "../models/model.product";
import mongoose from 'mongoose';
import Category from '../models/model.category';


class ProductController {
    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        const products = await Product.find();
        if (!products) {
            return res.status(400).send({
                message: "No products found"
            });
        }
        res.json(products);
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).send({
                message: "Product not found"
            });
        }
        res.json(product);
    }

    async createProduct(req: Request, res: Response, next: NextFunction) {
        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(400).send({
                message: "Category not found"
            });
        }
        const file = req.file;

        if (!file) {
            return res.status(400).send({
                message: "No file uploaded"
            });
        }

        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;


        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: `${basePath}${fileName}`,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        })

        product = await product.save();

        if (!product) {
            return res.status(400).send({
                message: "Product not created"
            });
        }

        return res.send(product);
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({
                message: "Product not found"
            });
        }

        const category = await Category.findById(req.body.category);

        if (!category) {
            return res.status(400).send({
                message: "Category not found"
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(400).send({
                message: "Product not found"
            });
        }

        const file = req.file;
        let imagepath;

        if (file) {
            const fileName = file.filename;
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
            imagepath = `${basePath}${fileName}`;
        } else {
            imagepath = product.image;
        }


        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: imagepath,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        })

        if (!updatedProduct) return res.status(500).send('the product cannot be updated!');

        return res.send(updatedProduct);
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        const product = await Product.findByIdAndRemove(req.params.id);

        if (!product) {
            return res.status(400).send({
                message: "Product not found"
            });
        }
    }
}

export default new ProductController();