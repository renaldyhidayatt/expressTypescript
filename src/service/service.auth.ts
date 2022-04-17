import { DaoUsers } from '../dao/dao.user';
import User from '../models/model.user';

class UserService implements DaoUsers {
    async registerService(email: string, password: string): Promise<any> {
        return await User.create({
            email,
            password
        });
    }

    async findByid(id: string): Promise<any> {
        return await User.findById(id)
    }

    async findByEmail(email: string): Promise<any> {
        const user = await User.findOne({ email });

        if (!user) return null;

        return user;
    }

    async deleteUser(id: string): Promise<any> {
        return await User.findByIdAndDelete(id);
    }
}

export default new UserService();