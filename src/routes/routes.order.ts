import express from 'express'
import controllerOrder from '../controllers/controller.order';

const router = express.Router();


router.get("/", controllerOrder.getAllOrders);
router.get("/:id", controllerOrder.getOrder);
router.post("/", controllerOrder.createOrder);
router.put("/:id", controllerOrder.updateOrder);
router.delete("/:id", controllerOrder.deleteOrder);

export default router