import express from 'express';
import controllerAuth from '../controllers/controller.auth';


const router = express.Router();


router.post("/register", controllerAuth.signUp);
router.post("/login", controllerAuth.signIn);



export default router;