import { DaoProduct} from '../dao/dao.product'
import Product from '../models/model.product'
import Category from '../models/model.category';
import {Request, Response} from "express"
import { IProduct } from '../interface/IProduct';
import mongoose from 'mongoose';

class ProductService implements DaoProduct{
    async getAllProducts(req: Request, res: Response): Promise<any>{
        const products = await Product.find();
        if (!products) {
            return res.status(400).send({
                message: "No products found"
            });
        }
        res.json(products);
    }

    async getProduct(req: Request, res: Response): Promise<any>{
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).send({
                message: "Product not found"
            });
        }
        res.json(product);
    }
    async createProduct(req: Request, res: Response): Promise<any> {
        const { 
            name,
            description,
            richDescription,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured
        }: IProduct = req.body
        const categories = Category.findById(category);
        if (!categories) {
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


        let product = {
            name,
            description,
            richDescription,
            image: `${basePath}${fileName}`,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured
        }

        const productsave = Product.create(product);

        if (!productsave) {
            return res.status(400).send({
                message: "Product not created"
            });
        }

        return res.send(product);
    }
    async updateProduct(req: Request, res: Response): Promise<any> {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({
                message: "Product not found"
            });
        }

        const category = Category.findById(req.params.id)

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


        const updatedProduct = Product.findByIdAndUpdate(req.params.id, {
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
    async deleteProduct(req: Request, res: Response): Promise<any> {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(400).send({
                message: "Product not found"
            });
        }

        const deletedProduct = Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(400).send({
                message: "Product not deleted"
            });
        }

        return res.send(deletedProduct);
    }
}

export default new ProductService();