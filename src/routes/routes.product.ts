import express from 'express';
import controllerProduct from '../controllers/controller.product';
import fileUpload from '../utils/upload'

const router = express.Router();


router.get("/", controllerProduct.getAllProducts);
router.get("/:id", controllerProduct.getProduct);
router.post("/", fileUpload.single('image'), controllerProduct.createProduct);
router.put("/:id", fileUpload.single('image'), controllerProduct.updateProduct);
router.delete("/:id", controllerProduct.deleteProduct);


export default router;