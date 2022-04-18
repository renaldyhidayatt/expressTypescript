import express from 'express';
import controllerUser from '../controllers/controller.user';

const router = express.Router();

router.get("/", controllerUser.getAllUsers);
router.get("/:id", controllerUser.getUser);
router.put("/:id", controllerUser.updateUser);
router.delete("/:id", controllerUser.deleteUser);


export default router;