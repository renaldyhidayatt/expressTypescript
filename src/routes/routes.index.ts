import express, { Request, Response } from 'express';
import AuthMiddleware from '../middleware/auth';

const router = express.Router();

router.get("/", AuthMiddleware, (req: Request, res: Response) => {
    res.send("Hello World");
})



export default router;