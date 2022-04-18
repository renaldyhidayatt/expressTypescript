import { Request, Response, NextFunction } from 'express'
import User from "../models/model.user";
import serviceAuth from "../service/service.auth";
import PkgPassword from '../pkg/bcrypt'


class UserController {
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        const users = await User.find().select("-passwordHash");

        if (!users) {
            return res.status(400).send({
                message: "No users found"
            });
        }
        res.json(users);
    }

    async getUser(req: Request, res: Response, next: NextFunction) {
        const user = await serviceAuth.findByid(req.params.id);

        if (!user) {
            return res.status(400).send({
                message: "User not found"
            });
        }
        res.json(user);
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        const user = await serviceAuth.findByid(req.params.id);
        const { name, email, password, phone, street, apartment, zip, city, country } = req.body;
        let newPassword;
        if (!user) {
            return res.status(400).send({
                message: "User not found"
            });
        }

        if (password) {
            newPassword = await PkgPassword.hashPassword(password);
        } else {
            newPassword = user.passwordHash;
        }

        const userUpdate = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country
        })

        return res.send(userUpdate);
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        const user = await serviceAuth.findByid(req.params.id);

        if (!user) {
            return res.status(400).send({
                message: "User not found"
            });
        }

        const userDelete = await User.findByIdAndRemove(req.params.id);

        return res.send(userDelete);
    }
}
export default new UserController();