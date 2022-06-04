import { Request, Response} from "express"

import { DaoUsers } from '../dao/dao.user';
import User from '../models/model.user';
import { IAuth, IUser} from "../interface/IUser"
import PasswordPkg from "../utils/bcrypt"
import JwtPkg from "../utils/jwt"


class UserService implements DaoUsers {
    async findAll(req: Request, res: Response): Promise<any> {
        const users = await User.find().select("-passwordHash");

        if (!users) {
            return res.status(400).send({
                message: "No users found"
            });
        }
        res.json(users);
    }

    async registerService(req: Request, res: Response): Promise<any> {
        const { 
            name,
            email,
            passwordHash,
            phone,
            street,
            apartment,
            zip,
            city,
            country
         }: IUser = req.body;

        if (await this.findByEmail(req, res) != null) {
            return res.status(400).send({
                message: "User already exists"
            });
        }
        const newUser = await User.create({
            name,
            email,
            passwordHash,
            phone,
            street,
            apartment,
            zip,
            city,
            country
        });

        const token = JwtPkg.createJwt(newUser._id);

        return res.status(200).json({
            data: token,
            message: "User created successfully"
        })
    }
    async loginService(req: Request, res: Response): Promise<any> {
        const { email, password }: IAuth = req.body;

        const user = await User.findOne({ email });

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
    async findByid(req: Request, res: Response): Promise<any> {
        const user = await User.findById(req.params.id).select('-passwordHash');

        if (!user) return null;

        return res.json({
            data: user,
            message: "User found"
        });
    }

    async findByEmail(req: Request, res: Response): Promise<any> {
        const { email }  = req.params;

        const user = await User.findOne({ email }).select('-passwordHash');

        if (!user){
            return res.status(400).send({
                message: "User not found"
            })
        }
        return res.status(200).json({
            data: user,
            message: "User found"
        })
    }

    async updateId(req: Request, res: Response): Promise<any> {
        const {
            name,
            email,
            passwordHash,
            phone,
            street,
            apartment,
            zip,
            city,
            country
        }: IUser = req.body;
        const user = await User.findById(req.params.id).select('-passwordHash');
        let newPassword;
        if (!user) {
            return res.status(400).send({
                message: "User not found"
            });
        }

        if (req.body.password) {
            newPassword = await PasswordPkg.hashPassword(req.body.password);
        } else {
            newPassword = user.passwordHash;
        }

        const userUpdate = await User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            passwordHash,
            phone,
            street,
            apartment,
            zip,
            city,
            country
        })

        return res.send(userUpdate);
    }

    async deleteUser(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user){
            return res.status(400).send({
                message: "User not found"
            })
        }

        return res.status(200).json({
            data: user,
            message: "User deleted successfully"
        });
    }
}

export default new UserService();