import { Request, Response, NextFunction } from 'express'
import serviceAuth from '../service/service.auth';
import JwtPkg from '../pkg/jwt';
import PasswordPkg from '../pkg/bcrypt'

class AuthController {
    async signUp(req: Request, res: Response, next: NextFunction) {
        const { email, password }: { email: string, password: string } = req.body;

        if (await serviceAuth.findByEmail(email) != null) {
            return res.status(400).send({
                message: "User already exists"
            });
        }
        const newUser = await serviceAuth.registerService(email, password);

        const token = JwtPkg.createJwt(newUser._id);

        res.status(200).json({
            data: token,
            message: "User created successfully"
        })

    }

    async signIn(req: Request, res: Response, next: NextFunction) {
        const { email, password }: { email: string, password: string } = req.body;

        const user = await serviceAuth.findByEmail(email);

        if (!user) {
            return res.status(400).send({
                message: "User not found"
            });
        }

        const isValid = await PasswordPkg.correctPassword(password, user.password);

        if (!isValid) {
            return res.status(400).send({
                message: "Invalid password"
            });
        }

        const token = JwtPkg.createJwt(user._id);

        res.status(200).json({
            data: token,
            message: "User logged in successfully"
        })
    }
}


export default new AuthController();