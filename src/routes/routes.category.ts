import express from 'express'
import controllerCategory from '../controllers/controller.category';

const router = express.Router();


router.get("/", controllerCategory.getAllCategories);
router.get("/:id", controllerCategory.getCategory);
router.post("/", controllerCategory.createCategory);
router.put("/:id", controllerCategory.updateCategory);
router.delete("/:id", controllerCategory.deleteCategory);


export default router;